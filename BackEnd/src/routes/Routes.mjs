import express from "express";
import {
  getMensCategories,
  getMensProducts,
  getWomensProducts,
  getWomensCategories,
  getKidsProducts,
  getSportsProducts,
  getTestimonials,
  getBrands,
  getProducts,
  getProductById,
} from "../controllers/Controller.mjs";
import authRoutes from "./authRoutes.mjs";
import adminRoutes from "./adminRoutes.mjs";

const router = express.Router();

// Health Check
router.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Categories & Products Routes
router.get("/api/mens-categories", getMensCategories);
router.get("/api/mens", getMensProducts);
router.get("/api/womens", getWomensProducts);
router.get("/api/womens-categories", getWomensCategories)
router.get("/api/kids", getKidsProducts);
router.get("/api/sports", getSportsProducts);
router.get("/api/testimonials", getTestimonials);

// Unified & New API Routes
router.get("/api/brands", getBrands);
router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);

// Admin & Auth Routes
router.use("/api", authRoutes);
router.use("/api", adminRoutes);

import { createOrder } from "../controllers/adminController.mjs";

// Add this route:
router.post("/api/orders", createOrder);




export default router;