import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KidsHero from "../components/Kids/KidsHero";
import ShopByAge from "../components/Kids/ShopByAge";
import KidsCategories from "../components/Kids/KidsCategories";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import BrandSection from "../components/Cards/BrandSection";
import SchoolCollection from "../components/Kids/SchoolCollection";
import KidsOffers from "../components/Kids/KidsOffers";
import CustomerReviews from "../components/Cards/Testimonial";
import { fetchKidsProducts } from "../services/api";

function Kids() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allKids, setAllKids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKidsProducts()
      .then(setAllKids)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const ageFiltered = selectedAge
    ? allKids.filter((s) => s.ageGroup === selectedAge)
    : allKids;

  const categoryFiltered = selectedCategory
    ? ageFiltered.filter((s) => s.category === selectedCategory)
    : ageFiltered;

  const boysShoes = categoryFiltered.filter((s) => s.targetGender === "Boys" || s.gender === "Kids");
  const girlsShoes = categoryFiltered.filter((s) => s.targetGender === "Girls" || s.gender === "Kids");
  const newArrivalsKids = categoryFiltered.filter((s) => s.isNewArrival);
  const bestSellersKids = categoryFiltered.filter((s) => s.isBestSeller);
  const sportsCollectionKids = categoryFiltered.filter(
    (s) => s.category === "Sports Shoes" || s.category === "Running Shoes"
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <KidsHero />

      <ShopByAge activeAge={selectedAge} onSelectAge={(age) => setSelectedAge(selectedAge === age ? null : age)} />

      <KidsCategories activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(selectedCategory === cat ? null : cat)} />

      {(selectedAge || selectedCategory) && (
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl mb-4 text-xs">
          <span>
            Filtering Kids'' Shoes by:{" "}
            {selectedAge && <strong className="mr-2 text-amber-700">Age: {selectedAge}</strong>}
            {selectedCategory && <strong className="text-amber-700">Category: {selectedCategory}</strong>}
          </span>
          <button onClick={() => { setSelectedAge(null); setSelectedCategory(null); }}
            className="text-amber-800 font-bold underline hover:text-slate-900">Clear Filters</button>
        </div>
      )}

      <ProductSectionGrid badge="Active Boys" title="Boys'' Shoes"
        subtitle="Sturdy, comfortable sneakers and sports shoes designed for energetic boys."
        products={boysShoes.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Vibrant & Cute" title="Girls'' Shoes"
        subtitle="Playful color accents, glitter soles, and soft cushioned support for girls."
        products={girlsShoes.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Just In" title="New Arrivals"
        subtitle="Check out the newest additions to our kids'' footwear line."
        products={newArrivalsKids.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Parent Approved" title="Best Sellers"
        subtitle="Our highest rated kids shoes praised for endurance and comfort."
        products={bestSellersKids.slice(0, 4)} loading={loading} />

      <BrandSection genderFilter="Kids" targetBrands={["Nike", "Adidas", "Puma", "Skechers"]}
        title="Shop Kids'' Shoes by Brand" subtitle="Trusted quality and supportive ergonomics from top kids'' shoe brands." />
      <SchoolCollection />
      <ProductSectionGrid badge="Athletic & Gym" title="Sports Collection"
        subtitle="Non-marking rubber soles and breathable mesh for gym class and sports practice."
        products={sportsCollectionKids.slice(0, 4)} loading={loading} />
      <KidsOffers />
      <CustomerReviews title="Parents & Kids Reviews"
        subtitle="Hear what parents and happy young runners have to say about our shoes." />
      <Footer />
    </div>
  );
}

export default Kids;
