
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Construct connection string from env vars if not explicitly provided
// Usually Supabase provides a direct connection string in the dashboard, but here we might have to construct it or use a known one.
// The user provided "postgresql://postgres:postgres@127.0.0.1:54322/postgres" in the previous command attempt, so I'll use that as a fallback or try to find it.
// Actually, let's try to use the DATABASE_URL if it exists in .env.local, otherwise fallback to the local one.

const dbUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

console.log(`Connecting to database...`);

const client = new Client({
  connectionString: dbUrl,
});

async function applySchema() {
  try {
    await client.connect();
    
    const schemaPath = path.resolve(process.cwd(), 'notifications_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying schema...');
    await client.query(schemaSql);
    console.log('Schema applied successfully!');
  } catch (err) {
    console.error('Error applying schema:', err);
  } finally {
    await client.end();
  }
}

applySchema();
