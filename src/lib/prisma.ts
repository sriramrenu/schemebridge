import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
  // Only throw at runtime in production if no connection string exists
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Fallback to a dummy string only for the build phase to prevent pool crashes
const finalConnectionString = connectionString || "postgresql://dummy:dummy@localhost:5432/dummy";

const pool = new pg.Pool({ 
  connectionString: finalConnectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

