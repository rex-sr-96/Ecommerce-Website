import pool from "../config/db.mjs";

const run = async () => {
  try {
    const query = `
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'pending' 
      CHECK (status IN ('pending', 'completed', 'cancelled'));
    `;
    await pool.query(query);
    console.log("✅ 'status' column added to orders table.");
  } catch (err) {
    console.error("❌ Error adding status column:", err);
  } finally {
    await pool.end();
  }
};

run();
