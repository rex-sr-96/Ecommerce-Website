import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.mjs";
import razorpay from "../config/razorpay.mjs";
import crypto from "node:crypto";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND LOWER(role) = 'admin'",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials or unauthorized" });
    }

    const storedPassword = user.password || user.password_hash;
    let isMatch = false;

    if (storedPassword) {
      if (storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2a$")) {
        isMatch = await bcrypt.compare(password, storedPassword);
      } else {
        isMatch = password === storedPassword;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role.toLowerCase(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Customer User Registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if user exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user into PostgreSQL users table
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, 'customer', CURRENT_TIMESTAMP)
       RETURNING id, name, email, role, created_at`,
      [name, email, passwordHash]
    );

    const newUser = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
};

// Customer User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const storedPassword = user.password_hash || user.password;
    let isMatch = false;

    if (storedPassword) {
      if (storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2a$")) {
        isMatch = await bcrypt.compare(password, storedPassword);
      } else {
        isMatch = password === storedPassword;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("User Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT
        o.id,
        o.total_amount,
        o.payment_method,
        o.payment_status,
        COALESCE(o.status, o.order_status, 'pending') AS status,
        o.created_at,
        

        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price_at_purchase,
              'name', p.name,
              'image', p.image
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) AS items

      FROM orders o

      LEFT JOIN order_items oi
        ON o.id = oi.order_id

      LEFT JOIN products p
        ON oi.product_id = p.id

      WHERE o.user_id = $1

      GROUP BY o.id

      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (err) {
    console.error("Get User Orders Error:", err);

    res.status(500).json({
      error: "Failed to fetch orders"
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
        id,
        name,
        email,
        role,
        address,
        phone_number,
        city,
        state,
        zip_code,
        region
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json({
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Get Current User Error:", error);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// User Update Controller

export const updateUserProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      name,
      phone,
      address,
      city,
      state,
      zipCode,
      zip_Code,
      country,
      region,
    } = req.body;

    // Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET
         name = $1,
         phone_number = $2,
         address = $3,
         city = $4,
         state = $5,
         zip_code = $6,
         region = $7
       WHERE id = $8
       RETURNING
         id,
         name,
         email,
         phone_number,
         address,
         city,
         state,
         zip_code,
         region`,
      [
        name.trim(),
        phone || null,
        address || null,
        city || null,
        state || null,
        zipCode || zip_Code || null,
        country || region || null,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
// Delivery Address

export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        ua.id,
        ua.address_type as type,
        ua.address as street,
        ua.city,
        ua.state,
        ua.zip_code as "zipCode",
        ua.is_default as "isDefault",
        u.name,
        u.email,
        u.phone_number as phone
      FROM user_addresses ua
      JOIN users u
        ON u.id = ua.user_id
      WHERE ua.user_id = $1
      ORDER BY ua.is_default DESC, ua.created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      addresses: result.rows
    });

  } catch (error) {
    console.error("Get addresses error:", error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

export const addUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, name, phone, address, city, state, zipCode, isDefault } = req.body;

    if (isDefault) {
      await pool.query(
        `UPDATE user_addresses SET is_default = false WHERE user_id = $1`,
        [userId]
      );
    }

    const result = await pool.query(
      `
      INSERT INTO user_addresses (user_id, address_type, address, city, state, zip_code, is_default)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [userId, type, address, city, state, zipCode, isDefault || false]
    );

    const addressId = result.rows[0].id;
    const joinedResult = await pool.query(
      `
      SELECT
        ua.id,
        ua.address_type as type,
        ua.address as street,
        ua.city,
        ua.state,
        ua.zip_code as "zipCode",
        ua.is_default as "isDefault",
        u.name,
        u.email,
        u.phone_number as phone
      FROM user_addresses ua
      JOIN users u ON u.id = ua.user_id
      WHERE ua.id = $1
      `,
      [addressId]
    );

    return res.status(201).json({
      address: joinedResult.rows[0]
    });

  } catch (error) {
    console.error("Add address error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await pool.query(
      `DELETE FROM user_addresses WHERE id = $1 AND user_id = $2`,
      [addressId, userId]
    );

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete address error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await pool.query(
      `UPDATE user_addresses SET is_default = false WHERE user_id = $1`,
      [userId]
    );

    await pool.query(
      `UPDATE user_addresses SET is_default = true WHERE id = $1 AND user_id = $2`,
      [addressId, userId]
    );

    return res.status(200).json({ message: "Default address set successfully" });
  } catch (error) {
    console.error("Set default address error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Payment Controller

export const createRazorPayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Razorpay error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create Razorpay order",
    });
  }
};

export const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      user_id,
      totalAmount,
      payment_method,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items = []
    } = req.body;

    if (!user_id || !payment_method) {
      return res.status(400).json({
        message: "User and payment method are required"
      });
    }

    if (!totalAmount || Number(totalAmount) <= 0) {
      return res.status(400).json({
        message: "Valid total amount is required"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    await client.query("BEGIN");

    let paymentStatus = "Pending";

    // ==========================================
    // RAZORPAY
    // ==========================================

    if (payment_method.toLowerCase() === "razorpay") {

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "Razorpay payment details are missing"
        });
      }

      const generatedSignature = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "Payment verification failed"
        });
      }

      paymentStatus = "Paid";
    }

    // ==========================================
    // COD
    // ==========================================

    else if (payment_method.toLowerCase() === "cod") {

      paymentStatus = "Pending";
    }

    // ==========================================
    // INVALID PAYMENT METHOD
    // ==========================================

    else {

      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Invalid payment method"
      });
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const orderResult = await client.query(
      `INSERT INTO orders
            (
                user_id,
                total_amount,
                payment_method,
                payment_status,
                order_status,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
      [
        user_id,
        totalAmount,
        payment_method.toLowerCase(),
        paymentStatus,
        "Processing",
        razorpay_order_id || null,
        razorpay_payment_id || null,
        razorpay_signature || null
      ]
    );

    const order = orderResult.rows[0];

    // ==========================================
    // CREATE ORDER ITEMS
    // ==========================================

    for (const item of items) {

      await client.query(
        `INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    price_at_purchase
                )
                VALUES ($1,$2,$3,$4)`,
        [
          order.id,
          item.id,
          item.quantity,
          item.price
        ]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order"
    });

  } finally {
    client.release();
  }
};