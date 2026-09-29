import pool from "../config/db.mjs";
import crypto from "crypto";




export const getDashboardStats = async (req, res) => {
  try {
    const usersCountResult = await pool.query("SELECT COUNT(*) FROM users");
    const ordersCountResult = await pool.query("SELECT COUNT(*) FROM orders");
    const revenueResult = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as sum FROM orders WHERE status != 'cancelled'");
    const productsCountResult = await pool.query("SELECT COUNT(*) FROM products");

    // Monthly / Recent sales analytics (defaults if empty)
    const salesOverTimeResult = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Mon DD') as date,
        COUNT(*)::int as orders,
        COALESCE(SUM(total_amount), 0)::numeric as revenue
      FROM orders
      GROUP BY TO_CHAR(created_at, 'Mon DD'), DATE_TRUNC('day', created_at)
      ORDER BY DATE_TRUNC('day', created_at) ASC
      LIMIT 7
    `);

    // Order status breakdown
    const orderStatusResult = await pool.query(`
      SELECT status, COUNT(*)::int as count
      FROM orders
      GROUP BY status
    `);

    // Category distribution
    const categoryResult = await pool.query(`
      SELECT COALESCE(category_name, 'Uncategorized') as name, COUNT(*)::int as count
      FROM products
      WHERE category_name IS NOT NULL
      GROUP BY category_name
      ORDER BY count DESC
      LIMIT 6
    `);

    // Brand distribution
    const brandResult = await pool.query(`
      SELECT COALESCE(brand_name, 'Other') as name, COUNT(*)::int as count
      FROM products
      WHERE brand_name IS NOT NULL
      GROUP BY brand_name
      ORDER BY count DESC
      LIMIT 6
    `);

    // Recent orders
    const recentOrdersResult = await pool.query(`
      SELECT o.id, o.total_amount, o.status, o.created_at, u.name as user_name, u.email as user_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    // Recent users
    const recentUsersResult = await pool.query(`
      SELECT id, name, email, role, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 5
    `);

    res.json({
      totalUsers: parseInt(usersCountResult.rows[0].count) || 0,
      totalOrders: parseInt(ordersCountResult.rows[0].count) || 0,
      totalRevenue: Number(revenueResult.rows[0].sum || 0),
      totalProducts: parseInt(productsCountResult.rows[0].count) || 0,
      salesOverTime: salesOverTimeResult.rows,
      orderStatus: orderStatusResult.rows,
      categoryDistribution: categoryResult.rows,
      brandDistribution: brandResult.rows,
      recentOrders: recentOrdersResult.rows,
      recentUsers: recentUsersResult.rows,
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const query = `
      SELECT o.id, o.total_amount, o.status, o.created_at, u.name as user_name, u.email as user_email 
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Order status is required"
      });
    }
    // Normalize status to lowercase for consistency
    const normalizedStatus = status.toLowerCase();

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
    }

    const result = await pool.query(
      `
            UPDATE orders
            SET status = $1, order_status = $1
            WHERE id = $2
            RETURNING *
            `,
      [normalizedStatus, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: result.rows[0]
    });

  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      message: "Failed to update order status",
      error: error.message
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, gender, category_id, category, brand_id, brand, image, image_url, description, stock = 10 } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, price, gender, category_id, category_name, brand_id, brand_name, image, description, stock) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        name,
        price,
        gender || 'Men',
        category_id || null,
        category || null,
        brand_id || null,
        brand || null,
        image || image_url || '',
        description,
        parseInt(stock) || 0
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, category, image_url, image } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name), 
           price = COALESCE($2, price), 
           description = COALESCE($3, description),
           stock = CASE WHEN $4::int IS NOT NULL THEN $4::int ELSE stock END,
           category_name = COALESCE($5, category_name),
           image = COALESCE($6, image)
       WHERE id = $7 RETURNING *`,
      [
        name ?? null,
        price ? Number(price) : null,
        description ?? null,
        stock !== undefined && stock !== "" ? parseInt(stock) : null,
        category ?? null,
        image_url || image || null,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const CreateOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userId = 1, totalAmount, shippingAddress = "Default Address", items = [] } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    await client.query("BEGIN");

    // 1. Insert into orders table
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status, shipping_address)
       VALUES ($1, $2, 'Pending', $3)
       RETURNING id`,
      [userId, totalAmount, shippingAddress]
    );

    const orderId = orderResult.rows[0].id;

    // 2. Insert items into order_items table
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    client.release();
  }
};

export const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      user_id = 1,
      totalAmount,
      payment_method,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items = []
    } = req.body;

    // --------------------------------
    // VALIDATION
    // --------------------------------

    if (!user_id || !payment_method) {
      return res.status(400).json({
        message: "User and payment method are required"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    await client.query("BEGIN");

    let paymentStatus = "Pending";

    // --------------------------------
    // RAZORPAY PAYMENT
    // --------------------------------

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

      const generatedSignature = crypto
        .createHmac(
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

    // --------------------------------
    // CASH ON DELIVERY
    // --------------------------------

    else if (payment_method.toLowerCase() === "cod") {
      paymentStatus = "Pending";
    }

    // --------------------------------
    // INVALID PAYMENT METHOD
    // --------------------------------

    else {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Invalid payment method"
      });
    }

    // --------------------------------
    // TOTAL AMOUNT
    // --------------------------------

    if (!totalAmount || Number(totalAmount) <= 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Invalid total amount"
      });
    }

    // --------------------------------
    // CREATE ORDER
    // --------------------------------

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

    // --------------------------------
    // INSERT ORDER ITEMS
    // --------------------------------

    for (const item of items) {

      if (!item.id || !item.quantity || !item.price) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          message: "Invalid order item"
        });
      }

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

    // --------------------------------
    // COMMIT TRANSACTION
    // --------------------------------

    await client.query("COMMIT");

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Failed to create order"
    });

  } finally {
    client.release();
  }
};