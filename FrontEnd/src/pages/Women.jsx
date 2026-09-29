import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WomenHero from "../components/Women/WomenHero";
import WomenCategories from "../components/Women/WomenCategories";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import BrandSection from "../components/Cards/BrandSection";
import WomenCollections from "../components/Women/WomenCollections";
import WomenOffers from "../components/Women/WomenOffers";
import CustomerReviews from "../components/Cards/Testimonial";
import { fetchWomensProducts } from "../services/api";

function Women() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allWomen, setAllWomen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWomensProducts()
      .then(setAllWomen)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryFiltered = selectedCategory
    ? allWomen.filter((s) => s.category === selectedCategory)
    : allWomen;

  const featuredWomen    = categoryFiltered.filter((s) => s.isFeatured);
  const trendingWomen    = categoryFiltered.filter((s) => s.isTrending);
  const newArrivalsWomen = categoryFiltered.filter((s) => s.isNewArrival);
  const bestSellersWomen = categoryFiltered.filter((s) => s.isBestSeller);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <WomenHero />

      <WomenCategories
        activeCategory={selectedCategory}
        onSelectCategory={(cat) =>
          setSelectedCategory(selectedCategory === cat ? null : cat)
        }
      />

      {selectedCategory && (
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl mb-4 text-xs">
          <span>Filtering Women''s Shoes by: <strong className="text-amber-700">{selectedCategory}</strong></span>
          <button onClick={() => setSelectedCategory(null)} className="text-amber-800 font-bold underline hover:text-slate-900">Clear Filter</button>
        </div>
      )}

      <ProductSectionGrid id="featured-women" badge="Women''s Spotlight" title="Featured Women''s Shoes"
        subtitle="Popular, highly rated footwear tailored for women." products={featuredWomen.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Current Hype" title="Trending Now"
        subtitle="The most sought-after women''s silhouettes this week." products={trendingWomen.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Just Arrived" title="New Arrivals"
        subtitle="Fresh colors and newly released women''s performance designs." products={newArrivalsWomen.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Top Customer Pick" title="Best Sellers"
        subtitle="Proven comfort and durability chosen by thousands of women." products={bestSellersWomen.slice(0, 4)} loading={loading} />

      <BrandSection genderFilter="Women" targetBrands={["Nike", "Adidas", "Puma", "Reebok", "Skechers"]}
        title="Shop Women''s Shoes by Brand" subtitle="Discover authentic footwear from top global sports & lifestyle brands." />
      <WomenCollections />
      <WomenOffers />
      <CustomerReviews title="Women''s Customer Reviews"
        subtitle="Read verified reviews from women who wear our shoes for sports, work, and everyday life." />
      <Footer />
    </div>
  );
}

export default Women;
