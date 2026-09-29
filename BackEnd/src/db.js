import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If DATABASE_URL is not set, fall back to individual env vars
  ...(!process.env.DATABASE_URL && {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  }),
  // Neon (and many cloud providers) require SSL but allow self‑signed certs
  ssl: { rejectUnauthorized: false }
});

export default pool;
