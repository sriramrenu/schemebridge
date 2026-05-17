import { prisma } from "./prisma";
import { pipeline } from '@xenova/transformers';

// Singleton for the embedding pipeline to avoid reloading the model on every call
class EmbeddingPipeline {
  static instance: any = null;

  static async getInstance() {
    if (this.instance === null) {
      // Use the standard feature extraction pipeline (outputs 384-dimensional vectors)
      this.instance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    return this.instance;
  }
}

export class RecommendationService {
  /**
   * Generates a 384-dimensional vector embedding for a given text.
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    const extractor = await EmbeddingPipeline.getInstance();
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  }

  /**
   * Generates a user profile summary string to be embedded.
   */
  static generateUserProfileText(user: any): string {
    return `State: ${user.state || 'India'}. Gender: ${user.gender || 'Any'}. Employment: ${user.employmentStatus || 'Unemployed'}. Student: ${user.studentStatus || 'No'}. Category: ${user.casteCategory || 'General'}.`;
  }

  /**
   * Fetches top schemes for a user using Hybrid Search (Metadata Scoring + Vector Similarity).
   */
  static async getTopSchemesForUser(userId: string, limit = 12) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // 1. Fetch relevant schemes using a DB-level filter for state matching
    const candidateSchemes = await prisma.scheme.findMany({
      where: {
        OR: [
          { stateScope: "Central" },
          { stateScope: user.state }
        ]
      }
    });

    // Generate embedding for the user's profile
    const userProfileText = this.generateUserProfileText(user);
    const userEmbedding = await this.generateEmbedding(userProfileText);
    const userEmbeddingString = `[${userEmbedding.join(',')}]`;

    // 2. We will use Prisma's raw query to calculate the Cosine Distance (<=>) 
    //    for the vector similarity, and combine it with our heuristic scoring.
    const similarityMap = new Map();
    
    if (candidateSchemes.length > 0) {
      const vectorResults = await prisma.$queryRawUnsafe<any[]>(
        `SELECT id, 1 - (embedding <=> $1::vector) as similarity_score FROM "Scheme" WHERE id IN (${candidateSchemes.map((s: any) => `'${s.id}'`).join(',')})`,
        userEmbeddingString
      );

      vectorResults.forEach(row => {
        similarityMap.set(row.id, row.similarity_score);
      });
    }

    // 3. Apply Hybrid Weighted Scoring Algorithm
    const scoredSchemes = candidateSchemes.map((scheme: any) => {
      let score = 0;
      
      // AI Semantic Similarity Scoring (Max ~100 points, as similarity is 0 to 1)
      const similarity = similarityMap.get(scheme.id) || 0;
      const aiScore = Math.max(0, similarity) * 100;

      // Helper function to check array-based hard constraints
      const checkConstraint = (schemeArray: string[], userValue: string | null | undefined) => {
        if (!schemeArray || schemeArray.length === 0) return true; // No constraint = valid for everyone
        return schemeArray.some((val: string) => 
          val.toLowerCase() === 'all' || 
          val.toLowerCase() === 'any' || 
          val.toLowerCase() === (userValue || '').toLowerCase()
        );
      };

      // 1. Gender Constraint
      if (!checkConstraint(scheme.targetGenders, user.gender)) {
        score -= 500;
      } else if (scheme.targetGenders?.length > 0) {
        score += 30; // Bonus if explicitly matched
      }

      // 2. Employment Constraint
      if (!checkConstraint(scheme.targetEmployment, user.employmentStatus)) {
        score -= 500;
      } else if (scheme.targetEmployment?.length > 0) {
        score += 30;
      }

      // 3. Caste Category Constraint
      if (!checkConstraint(scheme.targetCastes, user.casteCategory)) {
        score -= 500;
      } else if (scheme.targetCastes?.length > 0) {
        score += 20;
      }

      // 4. Student Status Constraint
      // If the scheme specifically targets students, but the user is NOT a student
      if (scheme.targetStudent === true && user.studentStatus?.toLowerCase() !== "student") {
         score -= 500;
      } else if (scheme.targetStudent === true && user.studentStatus?.toLowerCase() === "student") {
         score += 20;
      }

      // Hybrid Total Score
      const totalScore = score + aiScore;

      return { ...scheme, score: totalScore, heuristicScore: score, aiScore };
    });

    // 4. Sort and truncate
    return scoredSchemes
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit);
  }
}
