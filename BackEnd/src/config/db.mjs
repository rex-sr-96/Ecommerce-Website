import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const rawUrl = process.env.DATABASE_URL || "";
const cleanUrl = rawUrl
  .replace(/[&?]channel_binding=[^&]*/g, "")
  .replace(/[&?]sslmode=[^&]*/g, "");

const pool = new Pool({
  connectionString: cleanUrl,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 2,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: true,
  keepAlive: true,
});

pool.on("error", (err) => {
  // Log but don't crash — the pool will open a fresh connection on the next request
  console.error("Idle client error (will reconnect):", err.message);
});

export default pool;