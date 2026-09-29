import express from "express";
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllOrders, 
  updateOrderStatus, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/adminController.mjs";
import { verifyToken, isAdmin } from "../middleware/auth.mjs";

const router = express.Router();

// Apply middleware to all admin routes
router.use("/admin", verifyToken, isAdmin);

// Dashboard
router.get("/admin/dashboard", getDashboardStats);

// Users
router.get("/admin/users", getAllUsers);

// Orders
router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/:id/status", updateOrderStatus);

// Products
router.post("/admin/products", addProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

export default router;
