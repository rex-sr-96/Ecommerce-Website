import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheck,
  FaChevronRight,
  FaRuler,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaArrowLeft,
  FaTimesCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/Common/ProductCard";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { fetchProductById, fetchProducts } from "../services/api";

const SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User selections
  const [selectedSize, setSelectedSize] = useState("8.5");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (!data || !data.id) {
          throw new Error("Product not found");
        }
        setProduct(data);
        setSelectedImage(data.image || "");

        // Fetch related products in the same category/gender
        fetchProducts({ gender: data.gender || undefined, category: data.category || undefined })
          .then((all) => {
            const filtered = all.filter((p) => String(p.id) !== String(data.id)).slice(0, 4);
            setRelatedProducts(filtered);
          })
          .catch((err) => console.error("Error fetching related:", err));
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Product could not be loaded or was not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-(--color-background) text-(--color-text) flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-[480px] bg-gray-200 rounded-3xl"></div>
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-14 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-(--color-background) text-(--color-text) flex flex-col justify-between">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShieldAlt size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "The product you are looking for does not exist or has been removed."}</p>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
          >
            <FaArrowLeft size={14} /> Back to Catalog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || price;
  const hasDiscount = originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const isFav = isFavorite(product.id);
  const stockCount = Number(product.stock !== undefined && product.stock !== null ? product.stock : 0);
  const inStock = stockCount > 0;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    navigate("/cart");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const galleryImages = [
    product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-text) flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <FaChevronRight size={10} className="text-gray-400" />
          {product.gender && (
            <>
              <Link
                to={`/${product.gender.toLowerCase()}s`}
                className="hover:text-gray-900 transition-colors capitalize"
              >
                {product.gender}'s
              </Link>
              <FaChevronRight size={10} className="text-gray-400" />
            </>
          )}
          {product.category && (
            <>
              <span className="hover:text-gray-900 transition-colors">{product.category}</span>
              <FaChevronRight size={10} className="text-gray-400" />
            </>
          )}
          <span className="font-semibold text-gray-800 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="h-full w-full object-contain p-6 sm:p-10 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isLimitedEdition && (
                  <span className="px-3 py-1.5 rounded-full bg-amber-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Limited Edition
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    New Arrival
                  </span>
                )}
                {hasDiscount && (
                  <span className="px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist and Share Floating Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2.5">
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${isFav
                    ? "bg-red-500 text-white"
                    : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isFav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                </button>
                <button
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full bg-white/90 text-gray-600 hover:bg-gray-900 hover:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300"
                  title="Share Link"
                >
                  <FaShareAlt size={16} />
                </button>
              </div>

              {copied && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg animate-fade-in">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-4 p-4 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 shrink-0 p-2 ${selectedImage === img
                    ? "border-gray-900 shadow-md scale-105"
                    : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand || product.brand_name || "Premium Footwear"}
                </span>
                {product.gender && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.gender}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  {product.rating || "4.8"}
                </span>
                <span className="text-gray-400">|</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-900 underline underline-offset-4"
                >
                  {product.reviewsCount || 64} verified reviews
                </button>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 mb-6">
                <span className="text-3xl font-black text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-400 line-through font-semibold">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Save ${(originalPrice - price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description Snippet */}
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {product.description ||
                  "Engineered for ultimate responsive comfort and sleek everyday styling. Featuring ultra-breathable mesh upper, cushioned midsole support, and durable high-traction rubber outsole."}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Select US Size
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaRuler size={12} /> Size Chart
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 rounded-xl font-bold text-sm transition-all duration-200 border ${selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Stock Status */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={!inStock || quantity <= 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <FaMinus size={11} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900 text-base">
                    {inStock ? quantity : 0}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stockCount, q + 1))}
                    disabled={!inStock || quantity >= stockCount}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <FaPlus size={11} />
                  </button>
                </div>

                {/* Dynamic Stock Indicator */}
                <div
                  className={`flex items-center gap-2 text-sm font-semibold ${inStock ? "text-emerald-600" : "text-red-600"
                    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${inStock ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                      }`}
                  ></span>
                  {inStock ? (
                    <span>In Stock ({stockCount} available) • Ready to dispatch</span>
                  ) : (
                    <span>Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${!inStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : isAdded
                      ? "bg-emerald-600 text-white shadow-emerald-600/20"
                      : "bg-gray-900 text-white hover:bg-black shadow-gray-900/20"
                    }`}
                >
                  {!inStock ? (
                    <>
                      <FaTimesCircle size={18} />
                      <span>Out of Stock</span>
                    </>
                  ) : isAdded ? (
                    <>
                      <FaCheck size={18} />
                      <span>Added to Shopping Bag ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart size={18} />
                      <span>Add to Cart • ${(price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className={`w-full h-14 rounded-2xl font-bold transition-all duration-300 shadow-lg ${!inStock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-amber-400 hover:bg-amber-500 text-gray-950 shadow-amber-400/20"
                    }`}
                >
                  {inStock ? "Buy Now with 1-Click Checkout" : "Item Unavailable"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
                <div className="flex flex-col items-center">
                  <FaTruck size={18} className="text-gray-700 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">Free Delivery</span>
                  <span className="text-[10px] text-gray-500">On orders $100+</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200 px-2">
                  <FaUndo size={18} className="text-gray-700 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">30-Day Returns</span>
                  <span className="text-[10px] text-gray-500">Hassle-free guarantee</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaShieldAlt size={18} className="text-gray-700 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">100% Authentic</span>
                  <span className="text-[10px] text-gray-500">Official merchandise</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex border-b border-gray-200 overflow-x-auto gap-8">
            {[
              { id: "details", label: "Product Specifications" },
              { id: "shipping", label: "Shipping & Returns" },
              { id: "reviews", label: `Customer Reviews (${product.reviewsCount || 64})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 text-gray-700">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Core Specifications</h3>
                  <dl className="divide-y divide-gray-100 text-sm">
                    <div className="py-2.5 flex justify-between">
                      <dt className="font-semibold text-gray-500">Brand</dt>
                      <dd className="font-medium text-gray-900">{product.brand || product.brand_name || "Official Brand"}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="font-semibold text-gray-500">Category</dt>
                      <dd className="font-medium text-gray-900">{product.category || product.category_name || "Footwear"}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="font-semibold text-gray-500">Stock Availability</dt>
                      <dd className={`font-semibold ${inStock ? "text-emerald-600" : "text-red-600"}`}>
                        {inStock ? `${stockCount} units in stock` : "Currently Out of Stock"}
                      </dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="font-semibold text-gray-500">Target Gender</dt>
                      <dd className="font-medium text-gray-900">{product.gender || "Unisex"}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="font-semibold text-gray-500">SKU / Code</dt>
                      <dd className="font-mono text-gray-900">{product.productCode || `SKU-${product.id * 849}`}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Highlights & Care</h3>
                  <ul className="space-y-2 text-sm list-disc pl-5 text-gray-600">
                    <li>Engineered breathable mesh upper keeps feet cool and dry.</li>
                    <li>Plush foam midsole delivers all-day energy return.</li>
                    <li>High-abrasion rubber outsole provides multi-surface traction.</li>
                    <li>Padded collar and tongue for snug ankle lockdown.</li>
                    <li>Wipe clean with a damp cloth; do not machine wash or dry clean.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6 max-w-3xl text-sm leading-relaxed">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Delivery Timelines</h3>
                  <p className="text-gray-600 mb-2">
                    Orders are processed within 24 business hours. You will receive a tracking link as soon as your shipment leaves our distribution hub.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>Standard Delivery (3-5 Business Days):</strong> Free on orders above $100 (otherwise $4.99)</li>
                    <li><strong>Express Courier (1-2 Business Days):</strong> $12.99</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">30-Day Free Return Policy</h3>
                  <p className="text-gray-600">
                    Not the perfect fit? Return unworn items in their original packaging within 30 days for a full refund or exchange. We provide pre-paid return labels on request.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-200/80">
                  <div className="text-center">
                    <div className="text-5xl font-black text-gray-900 mb-1">{product.rating || "4.8"}</div>
                    <div className="flex text-amber-400 justify-center mb-1">
                      <FaStar size={16} />
                      <FaStar size={16} />
                      <FaStar size={16} />
                      <FaStar size={16} />
                      <FaStarHalfAlt size={16} />
                    </div>
                    <div className="text-xs text-gray-500">Based on {product.reviewsCount || 64} reviews</div>
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentages = { 5: 78, 4: 16, 3: 4, 2: 1, 1: 1 };
                      return (
                        <div key={stars} className="flex items-center gap-3 text-xs">
                          <span className="w-12 font-semibold text-gray-600">{stars} Stars</span>
                          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percentages[stars]}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right text-gray-500">{percentages[stars]}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4 pt-4">
                  {[
                    {
                      author: "Alex M.",
                      date: "2 days ago",
                      rating: 5,
                      comment: "Extremely comfortable right out of the box. Cushioning feels great for 5K runs and daily gym workouts.",
                    },
                    {
                      author: "Samantha K.",
                      date: "1 week ago",
                      rating: 5,
                      comment: "The shoe looks even better in person! Fits true to size and the colorway is stunning.",
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">{rev.author}</span>
                          <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <FaStar key={idx} size={12} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Recommended For You
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">Similar Styles You Might Love</h2>
              </div>
              <Link
                to={product.gender ? `/${product.gender.toLowerCase()}s` : "/home"}
                className="text-sm font-bold text-gray-900 hover:underline flex items-center gap-1.5"
              >
                View More <FaChevronRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Size Chart Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Footwear Size Conversion</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 border-b">
                    <th className="p-2.5 font-bold">US</th>
                    <th className="p-2.5 font-bold">UK</th>
                    <th className="p-2.5 font-bold">EU</th>
                    <th className="p-2.5 font-bold">CM / Insole</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {[
                    ["7.0", "6.0", "40.0", "25.0 cm"],
                    ["7.5", "6.5", "40.5", "25.5 cm"],
                    ["8.0", "7.0", "41.0", "26.0 cm"],
                    ["8.5", "7.5", "42.0", "26.5 cm"],
                    ["9.0", "8.0", "42.5", "27.0 cm"],
                    ["9.5", "8.5", "43.0", "27.5 cm"],
                    ["10.0", "9.0", "44.0", "28.0 cm"],
                    ["10.5", "9.5", "44.5", "28.5 cm"],
                    ["11.0", "10.0", "45.0", "29.0 cm"],
                    ["12.0", "11.0", "46.0", "30.0 cm"],
                  ].map(([us, uk, eu, cm], idx) => (
                    <tr key={idx} className={selectedSize === us ? "bg-blue-50 font-bold text-blue-900" : ""}>
                      <td className="p-2.5">{us}</td>
                      <td className="p-2.5">{uk}</td>
                      <td className="p-2.5">{eu}</td>
                      <td className="p-2.5">{cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
