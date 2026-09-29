import express from "express";
import { verifyToken } from "../middleware/auth.mjs";
import {
  adminLogin,
  register,
  userLogin,
  updateUserProfile,
  getUserOrders,
  getCurrentUser,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
  setDefaultAddress,
  createRazorPayOrder,
  createOrder
} from "../controllers/authController.mjs";

const router = express.Router();

// Admin Login
router.post("/auth/admin/login", adminLogin);

// Customer Registration & Login
router.post("/auth/register", register);
router.post("/auth/signup", register);
router.post("/auth/login", userLogin);

// Customer Profile & Orders
router.put("/user/profile", verifyToken, updateUserProfile);
router.get("/user/orders/:userId", verifyToken, getUserOrders);

// User Addresses
router.get("/user/addresses", verifyToken, getUserAddresses);
router.post("/user/addresses", verifyToken, addUserAddress);
router.delete("/user/addresses/:id", verifyToken, deleteUserAddress);
router.put("/user/addresses/:id/default", verifyToken, setDefaultAddress);

// Create Order 
router.post("/user/create-order", createRazorPayOrder);
router.post("/user/make-order", createOrder);
//User Info
router.put("/user", verifyToken, getCurrentUser)
router.get("/user", verifyToken, getCurrentUser);

export default router;

