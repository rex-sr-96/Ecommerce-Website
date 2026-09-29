import React, { useState, useEffect } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";
import { fetchBrands, fetchProductsByBrand } from "../../services/api";

const BrandSection = ({
  targetBrands,
  genderFilter,
  title = "Shop by Brand",
  subtitle = "Explore iconic performance and fashion footwear brands.",
}) => {
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch brands on mount
  useEffect(() => {
    fetchBrands()
      .then((data) => {
        const brands = targetBrands
          ? data.filter((b) => targetBrands.includes(b.name))
          : data;
        setAllBrands(brands);
        if (brands.length > 0) setSelectedBrand(brands[0].name);
      })
      .catch((err) => console.error("Failed to fetch brands:", err))
      .finally(() => setLoadingBrands(false));
  }, [targetBrands]);

  // Fetch products when selected brand changes
  useEffect(() => {
    if (!selectedBrand) return;
    setLoadingProducts(true);
    fetchProductsByBrand(selectedBrand, genderFilter)
      .then(setFilteredShoes)
      .catch((err) => console.error("Failed to fetch brand products:", err))
      .finally(() => setLoadingProducts(false));
  }, [selectedBrand, genderFilter]);

  return (
    <section className="bg-(--color-background) py-14 px-4 sm:px-6 lg:px-8 border-b border-(--color-border)">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Official Partners"
          title={title}
          subtitle={subtitle}
        />

        {/* Brand Logos / Selectors */}
        {loadingBrands ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-(--color-border)" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 mb-8">
            {allBrands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                  selectedBrand === brand.name
                    ? "border-(--color-contrast) bg-(--color-surface) shadow-xl shadow-amber-500/10 ring-2 ring-(--color-contrast)"
                    : "border-(--color-border) bg-(--color-surface) hover:border-(--color-contrast)/50 hover:shadow-md"
                }`}
              >
                <span className="text-3xl mb-1">{brand.logo}</span>
                <span className="text-sm font-extrabold text-(--color-text)">{brand.name}</span>
                <span className="text-[11px] text-(--color-secondary-text)">{brand.tagline}</span>
              </button>
            ))}
          </div>
        )}

        {/* Shoes by Selected Brand */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-(--color-text)">
            {selectedBrand} Footwear {genderFilter ? `for ${genderFilter}` : ""}
          </h3>
          <span className="text-xs font-semibold text-(--color-secondary-text)">
            Showing {filteredShoes.length} Products
          </span>
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-(--color-border)" />
            ))}
          </div>
        ) : filteredShoes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredShoes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-(--color-surface) border border-(--color-border) p-8 text-center text-(--color-secondary-text)">
            No products found for {selectedBrand} under this selection.
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandSection;
