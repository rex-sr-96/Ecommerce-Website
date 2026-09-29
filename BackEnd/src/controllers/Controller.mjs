import pool from '../config/db.mjs';



// Get Mens Categories — derived from products table (categories table is not seeded)
export const getMensCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         category_name AS name,
         COUNT(*)::int AS count
       FROM products
       WHERE gender = 'Men' AND category_name IS NOT NULL
       GROUP BY category_name
       ORDER BY category_name`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Mens Categories:", error.message);
    res.status(500).json({ message: "Failed to fetch Mens Categories" });
  }
};

// Get Mens Products
export const getMensProducts = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE gender = 'Men' ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Mens Products:", error);
    res.status(500).json({ message: "Failed to fetch Mens Products" });
  }
};
// Get Womens Categories — derived from products table (categories table is not seeded)
export const getWomensCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         category_name AS name,
         COUNT(*)::int AS count
       FROM products
       WHERE gender = 'Women' AND category_name IS NOT NULL
       GROUP BY category_name
       ORDER BY category_name`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Womens Categories:", error.message);
    res.status(500).json({ message: "Failed to fetch Womens Categories" });
  }
};

// Get Womens Products
export const getWomensProducts = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE gender = 'Women' ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Womens Products:", error);
    res.status(500).json({ message: "Failed to fetch Womens Products" });
  }
};

// Get Kids Products
export const getKidsProducts = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE gender = 'Kids' ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Kids Products:", error);
    res.status(500).json({ message: "Failed to fetch Kids Products" });
  }
};

// Get Sports Products
export const getSportsProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE gender = 'Sports' OR sport_type IS NOT NULL AND sport_type != 'Casual' ORDER BY id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Sports Products:", error);
    res.status(500).json({ message: "Failed to fetch Sports Products" });
  }
};

// Get Testimonials
export const getTestimonials = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM testimonials ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Testimonials:", error);
    res.status(200).json([]);
  }
};

// Get All Brands
export const getBrands = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM brands ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching Brands:", error);
    res.status(500).json({ message: "Failed to fetch Brands" });
  }
};

// Unified Get Products (with dynamic filters)
export const getProducts = async (req, res) => {
  try {
    const { gender, category, brand, isFeatured, isNewArrival, isBestSeller, isTrending, isLimitedEdition, isLastChance, search } = req.query;
    let queryText = `SELECT * FROM products WHERE 1=1`;
    const params = [];

    if (gender) {
      params.push(gender);
      queryText += ` AND gender = $${params.length}`;
    }
    if (category) {
      params.push(category);
      queryText += ` AND category_name = $${params.length}`;
    }
    if (brand) {
      params.push(brand);
      queryText += ` AND brand_name = $${params.length}`;
    }
    if (isFeatured === 'true') {
      queryText += ` AND is_featured = true`;
    }
    if (isNewArrival === 'true') {
      queryText += ` AND is_new_arrival = true`;
    }
    if (isBestSeller === 'true') {
      queryText += ` AND is_best_seller = true`;
    }
    if (isTrending === 'true') {
      queryText += ` AND is_trending = true`;
    }
    if (isLimitedEdition === 'true') {
      queryText += ` AND is_limited_edition = true`;
    }
    if (isLastChance === 'true') {
      queryText += ` AND is_last_chance = true`;
    }
    if (search) {
      params.push(`%${search}%`);
      queryText += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length} OR brand_name ILIKE $${params.length})`;
    }

    queryText += ` ORDER BY id ASC`;

    const result = await pool.query(queryText, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error querying products:", error);
    res.status(500).json({ message: "Failed to query products" });
  }
};

// Get Product by ID or Code
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isNum = !isNaN(Number(id));
    const queryText = isNum
      ? `SELECT * FROM products WHERE id = $1 OR product_code = $2`
      : `SELECT * FROM products WHERE product_code = $1`;
    const params = isNum ? [Number(id), id] : [id];

    const result = await pool.query(queryText, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

