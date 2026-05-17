import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pipeline } from '@xenova/transformers';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Loading schemes from JSON...');
  const schemesPath = path.join(__dirname, '..', 'src', 'app', 'data', 'schemes.json');
  if (!fs.existsSync(schemesPath)) {
    throw new Error(`Data file not found at ${schemesPath}`);
  }

  const rawData = fs.readFileSync(schemesPath, 'utf-8');
  const schemes = JSON.parse(rawData);

  console.log(`Loaded ${schemes.length} schemes. Initializing AI Model...`);
  
  // Initialize transformers pipeline
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('AI Model loaded! Starting embedding process (limited to first 100 for speed)...');

  const subset = schemes.slice(0, 100);

  for (let i = 0; i < subset.length; i++) {
    const scheme = subset[i];
    
    // 1. Heuristic Tag Extraction
    const content = (scheme.title + " " + scheme.summary + " " + scheme.category).toLowerCase();
    
    const targetGenders = [];
    if (content.includes('women') || content.includes('girl') || content.includes('penn')) targetGenders.push('Female');
    
    const targetEmployment = [];
    if (content.includes('agriculture') || content.includes('kisan')) targetEmployment.push('Farmer / Agriculture');
    if (content.includes('skill') || content.includes('employment')) targetEmployment.push('Unemployed');

    const targetStudent = content.includes('education') || content.includes('scholarship') || content.includes('student');

    // 2. Generate Semantic Vector Embedding
    const textToEmbed = `Title: ${scheme.title}. Summary: ${scheme.summary}. Category: ${scheme.category}. State: ${scheme.state || 'Central'}`;
    const output = await extractor(textToEmbed, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);
    
    // 3. Insert into Database
    try {
      const createdScheme = await prisma.scheme.upsert({
        where: { slug: scheme.slug },
        update: {},
        create: {
          slug: scheme.slug,
          title: scheme.title,
          summary: scheme.summary.substring(0, 500), // Safety truncation
          category: scheme.category,
          ministry: scheme.ministry,
          stateScope: scheme.state || 'Central',
          targetGenders,
          targetEmployment,
          targetStudent,
          targetCastes: []
        }
      });

      // Update vector embedding using raw SQL (Prisma doesn't support direct create for Unsupported types yet)
      await prisma.$executeRawUnsafe(
        `UPDATE "Scheme" SET embedding = $1::vector WHERE id = $2`,
        `[${embedding.join(',')}]`,
        createdScheme.id
      );

      process.stdout.write(`\rEmbedded and saved: ${i + 1}/${subset.length}`);
    } catch (e) {
      console.error(`\nFailed to save scheme ${scheme.slug}:`, e);
    }
  }

  console.log('\n\n✅ Database seeding and embedding generation complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
