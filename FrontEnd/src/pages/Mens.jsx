import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MensHero from "../components/Mens/MensHero";
import MensCategories from "../components/Mens/MensCategories";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import BrandSection from "../components/Cards/BrandSection";
import MensCollections from "../components/Mens/MensCollections";
import MensOffers from "../components/Mens/MensOffers";
import CustomerReviews from "../components/Cards/Testimonial";
import { fetchMensProducts } from "../services/api";

function Mens() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allMens, setAllMens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMensProducts()
      .then(setAllMens)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryFiltered = selectedCategory
    ? allMens.filter((s) => s.category === selectedCategory)
    : allMens;

  const featuredMens    = categoryFiltered.filter((s) => s.isFeatured);
  const trendingMens    = categoryFiltered.filter((s) => s.isTrending);
  const newArrivalsMens = categoryFiltered.filter((s) => s.isNewArrival);
  const bestSellersMens = categoryFiltered.filter((s) => s.isBestSeller);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* 1. Hero Banner */}
      <MensHero />

      {/* 2. Shop by Category */}
      <MensCategories
        activeCategory={selectedCategory}
        onSelectCategory={(cat) =>
          setSelectedCategory(selectedCategory === cat ? null : cat)
        }
      />

      {/* 3. Featured Men's Shoes */}
      <ProductSectionGrid
        id="mens-featured"
        badge="Men's Spotlight"
        title="Featured Men's Shoes"
        subtitle="Handpicked high-performance running, training, and lifestyle footwear."
        products={featuredMens.slice(0, 4)}
        loading={loading}
      />

      {/* 4. Trending Now */}
      <ProductSectionGrid
        badge="Hype & Popular"
        title="Trending Now"
        subtitle="The most popular men's silhouettes trending right now."
        products={trendingMens.slice(0, 4)}
        loading={loading}
      />

      {/* 5. New Arrivals */}
      <ProductSectionGrid
        badge="Fresh Release"
        title="New Arrivals"
        subtitle="Explore the latest technology, cushion foam, and design drops."
        products={newArrivalsMens.slice(0, 4)}
        loading={loading}
      />

      {/* 6. Best Sellers */}
      <ProductSectionGrid
        badge="Customer Favorites"
        title="Best Sellers"
        subtitle="Top-rated men's shoes backed by hundreds of positive customer reviews."
        products={bestSellersMens.slice(0, 4)}
        loading={loading}
      />

      {/* 7. Shop by Brand */}
      <BrandSection
        genderFilter="Men"
        targetBrands={["Nike", "Adidas", "Puma", "Reebok", "New Balance"]}
        title="Shop Men's Shoes by Brand"
        subtitle="Explore official performance footwear from top sports & lifestyle giants."
      />

      {/* 8. Men's Shoe Collections */}
      <MensCollections />

      {/* 9. Offers */}
      <MensOffers />

      {/* 10. Customer Reviews */}
      <CustomerReviews
        title="Men's Customer Reviews"
        subtitle="Read real stories from runners, athletes, and professionals who trust our shoes."
      />

      <Footer />
    </div>
  );
}

export default Mens;