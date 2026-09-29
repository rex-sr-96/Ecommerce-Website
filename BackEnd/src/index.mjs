import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/Routes.mjs";
import pool from "./config/db.mjs";


const app = express();

app.use(cors());
app.use(express.json());


app.use(router);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();

    console.log("✅ PostgreSQL (Neon) connected successfully");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  }
});