import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const cleanDatabaseUrl = databaseUrl.trim().replace(/^["']|["']$/g, '');

const pool = new pg.Pool({ 
  connectionString: cleanDatabaseUrl,
  ssl: false
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;