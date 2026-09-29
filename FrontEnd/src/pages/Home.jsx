import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import GenderCategories from "../components/Home/GenderCategories";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import CategoryCollections from "../components/Home/CategoryCollections";
import LimitedEdition from "../components/Home/LimitedEdition";
import BrandSection from "../components/Cards/BrandSection";
import CustomerReviews from "../components/Cards/Testimonial";
import Newsletter from "../components/Home/Newsletter";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setAllProducts(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featuredShoes = allProducts.filter(p => p.isFeatured);
  const newArrivals = allProducts.filter(p => p.isNewArrival);
  const bestSellers = allProducts.filter(p => p.isBestSeller);
  const trendingShoes = allProducts.filter(p => p.isTrending);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* 1. Hero Banner */}
      <Hero />

      {/* 2, 3, 4. Shop Men's, Women's, Kids' Shoes */}
      <GenderCategories />

      {/* 5. Featured Shoes */}
      <ProductSectionGrid
        badge="Editor's Choice"
        title="Featured Shoes"
        subtitle="Handpicked performance and lifestyle shoes recommended by our footwear stylists."
        products={featuredShoes.slice(0, 4)}
        actionText="View All Featured"
      />

      {/* 6. New Arrivals */}
      <ProductSectionGrid
        badge="Fresh In Stock"
        title="New Arrivals"
        subtitle="Check out the newest releases and latest technology drops."
        products={newArrivals.slice(0, 4)}
        actionText="Explore New Drops"
      />

      {/* 7. Best Sellers */}
      <ProductSectionGrid
        badge="Crowd Favorites"
        title="Best Sellers"
        subtitle="Our highest rated and most popular shoes loved by thousands."
        products={bestSellers.slice(0, 4)}
        actionText="Shop Best Sellers"
      />

      {/* 8. Trending Shoes */}
      <ProductSectionGrid
        badge="In High Demand"
        title="Trending Shoes"
        subtitle="Hot right now on street culture and social media trends."
        products={trendingShoes.slice(0, 4)}
        actionText="Discover Trends"
      />


      {/* 13. Limited Edition */}
      <LimitedEdition />

      {/* 14. Top Brands */}
      <BrandSection
        title="Top Brands"
        subtitle="Explore top athletic & casual shoe manufacturers worldwide."
      />

      {/* 15. Customer Reviews */}
      <CustomerReviews
        title="Customer Reviews"
        subtitle="Read real verified feedback from footwear enthusiasts and athletes."
      />

      {/* 16. Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;