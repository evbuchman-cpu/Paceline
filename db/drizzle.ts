import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env.local" });

// Only initialize database connection if DATABASE_URL is available
// This prevents build-time errors when the database isn't accessible
export const db = drizzle(process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db');
