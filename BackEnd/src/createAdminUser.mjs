import bcrypt from "bcrypt";
import pool from "./db.js"; // corrected path

// Admin credentials – change as desired
const adminEmail = "admin@example.com";
const adminName = "Admin";
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  throw new Error("Set ADMIN_PASSWORD in BackEnd/.env before creating the admin user.");
}

(async () => {
  try {
    // Generate bcrypt hash
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Insert admin user (if not exists)
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, 'admin', NOW())
       ON CONFLICT (email) DO NOTHING RETURNING id;`,
      [adminName, adminEmail, passwordHash]
    );

    if (result.rowCount > 0) {
      console.log("✅ Admin user created with id:", result.rows[0].id);
    } else {
      console.log("⚠️ Admin user already exists or insert was skipped.");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    await pool.end();
  }
})();
