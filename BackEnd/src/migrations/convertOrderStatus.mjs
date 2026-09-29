import pool from "../config/db.mjs";

const run = async () => {
  try {
    // 1. Add the new column if it doesn't exist
    await pool.query(`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS order_status VARCHAR(20) NOT NULL DEFAULT 'pending'
      CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'));
    `);
    console.log("✅ order_status column added.");

    // 2. Copy data from old column (if present)
    const colCheck = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'orders' AND column_name = 'status';
    `);
    if (colCheck.rowCount > 0) {
      await pool.query(`
        UPDATE orders SET order_status = status;
      `);
      console.log("🔁 Data copied from status → order_status.");
    }

    // 3. Drop the old column (optional but recommended)
    await pool.query(`
      ALTER TABLE orders DROP COLUMN IF EXISTS status;
    `);
    console.log("🗑️ Old status column removed.");
  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await pool.end();
  }
};

run();
