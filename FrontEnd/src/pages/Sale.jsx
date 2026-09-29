import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SaleHero from "../components/Sale/SaleHero";
import ShopByDiscount from "../components/Sale/ShopByDiscount";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import BrandSection from "../components/Cards/BrandSection";
import SaleInformation from "../components/Sale/SaleInformation";
import { fetchProducts } from "../services/api";

function Sale() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setAllProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getDiscountPercent = (shoe) => {
    if (!shoe.originalPrice || shoe.originalPrice <= shoe.price) return 0;
    return Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100);
  };

  const saleShoes = allProducts.filter((s) => s.originalPrice && s.originalPrice > s.price);

  const tierFiltered = selectedTier
    ? saleShoes.filter((s) => {
        const disc = getDiscountPercent(s);
        if (selectedTier === "under20") return disc < 20;
        if (selectedTier === "20to40") return disc >= 20 && disc < 40;
        if (selectedTier === "40to60") return disc >= 40 && disc < 60;
        if (selectedTier === "60plus") return disc >= 60;
        return true;
      })
    : saleShoes;

  const mensSale    = tierFiltered.filter((s) => s.gender === "Men");
  const womensSale  = tierFiltered.filter((s) => s.gender === "Women");
  const kidsSale    = tierFiltered.filter((s) => s.gender === "Kids");
  const sportsSale  = tierFiltered.filter((s) => s.category === "Sports Shoes" || s.category === "Running Shoes" || s.sportType);
  const sneakersSale = tierFiltered.filter((s) => s.category === "Sneakers");
  const bestDeals   = tierFiltered.filter((s) => getDiscountPercent(s) >= 30 || s.isBestSeller);
  const lastChance  = tierFiltered.filter((s) => s.isLastChance || getDiscountPercent(s) >= 40);
  const fallback    = saleShoes;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <SaleHero />

      <ShopByDiscount activeTier={selectedTier}
        onSelectTier={(tier) => setSelectedTier(selectedTier === tier ? null : tier)} />

      {selectedTier && (
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl mb-4 text-xs">
          <span>Filtering Sale Items by Discount Tier: <strong className="text-amber-700">{selectedTier}</strong></span>
          <button onClick={() => setSelectedTier(null)} className="text-amber-800 font-bold underline hover:text-slate-900">Clear Filter</button>
        </div>
      )}

      <div id="mens-sale">
        <ProductSectionGrid badge="Men''s Discounts" title="Men''s Sale"
          subtitle="Top markdowns on men''s running, sports, casual & formal shoes."
          products={(mensSale.length > 0 ? mensSale : fallback).slice(0, 4)} loading={loading} />
      </div>
      <div id="womens-sale">
        <ProductSectionGrid badge="Women''s Discounts" title="Women''s Sale"
          subtitle="Save big on women''s sneakers, running shoes, boots & heels."
          products={(womensSale.length > 0 ? womensSale : fallback).slice(0, 4)} loading={loading} />
      </div>
      <div id="kids-sale">
        <ProductSectionGrid badge="Kids'' Discounts" title="Kids'' Sale"
          subtitle="Discounted school shoes, sneakers & sports shoes for growing kids."
          products={(kidsSale.length > 0 ? kidsSale : fallback).slice(0, 4)} loading={loading} />
      </div>

      <ProductSectionGrid badge="Athletic Markdowns" title="Sports Sale"
        subtitle="Deals on professional running, football, basketball & gym training shoes."
        products={(sportsSale.length > 0 ? sportsSale : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Streetwear Deals" title="Sneakers Sale"
        subtitle="Special prices on iconic lifestyle sneakers & retro court shoes."
        products={(sneakersSale.length > 0 ? sneakersSale : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Steal Prices" title="Best Deals"
        subtitle="Handpicked deepest price reductions across our entire footwear catalog."
        products={(bestDeals.length > 0 ? bestDeals : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Final Stock" title="Last Chance"
        subtitle="Limited remaining sizes & clearance drops. Once gone, they won''t return."
        products={(lastChance.length > 0 ? lastChance : fallback).slice(0, 4)} loading={loading} />

      <BrandSection targetBrands={["Nike", "Adidas", "Puma", "Reebok", "New Balance"]}
        title="Shop Sale by Brand" subtitle="Authentic discounted footwear from premier global shoe manufacturers." />
      <SaleInformation />
      <Footer />
    </div>
  );
}

export default Sale;
