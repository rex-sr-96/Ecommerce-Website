import React, { useState, useEffect } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";

const collections = [
  { id: "Running", label: "Running Collection", icon: "🏃", desc: "Engineered for speed, stability and shock absorption." },
  { id: "Sports", label: "Sports Collection", icon: "⚽", desc: "High performance footwear for training and active sports." },
  { id: "Casual", label: "Casual Collection", icon: "👟", desc: "Everyday sneakers and comfortable stylish silhouettes." },
  { id: "Formal", label: "Formal Collection", icon: "👞", desc: "Premium genuine leather shoes for executive dress wear." }
];

const CategoryCollections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Running"); // ✅ added state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ filter products based on activeTab
  const filteredShoes = categories.filter(
    (product) => product.category === activeTab
  );

  if (loading) {
    return (
      <section className="bg-(--color-background) py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-(--color-secondary-text)">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Curated Collections"
          title="Browse By Activity & Lifestyle"
          subtitle="Discover footwear specifically optimized for your daily pursuits and athletic goals."
        />

        {/* Tab Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
          {collections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Collection Banner Info */}
        {collections.find(c => c.id === activeTab) && (
          <div className="mb-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {collections.find(c => c.id === activeTab).label}
              </h3>
              <p className="text-sm text-slate-600">
                {collections.find(c => c.id === activeTab).desc}
              </p>
            </div>
            <span className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950">
              {filteredShoes.length} Items Available
            </span>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredShoes.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCollections;
