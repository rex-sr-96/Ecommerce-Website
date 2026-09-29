import React, { useState, useEffect } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";

const collections = [
  { name: "Everyday", icon: "👟", desc: "Versatile sneakers and casual slip-ons engineered for daily comfort." },
  { name: "Running", icon: "🏃‍♂️", desc: "High mileage marathons & road runners with maximum energy return." },
  { name: "Training", icon: "🏋️‍♂️", desc: "Gym performance, cross-training & court footwear with firm traction." },
  { name: "Premium", icon: "👔", desc: "Hand-stitched leather Oxfords, luxury dress shoes & waterproof boots." }
];

const MensCollections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Everyday"); // default tab

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mens-categories");
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

  // Filter products based on activeTab
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
          badge="Curated Lines"
          title="Men's Shoe Collection"
          subtitle="Explore tailored lines crafted for everyday wear, long-distance running, intense workouts, and executive events."
        />

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {collections.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-extrabold transition-all duration-300 ${
                activeTab === tab.name
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Collection banner */}
        {collections.find((c) => c.name === activeTab) && (
          <div className="mb-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 sm:p-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">
              {collections.find((c) => c.name === activeTab).desc}
            </p>
            <span className="text-xs font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full">
              {filteredShoes.length} Items Available
            </span>
          </div>
        )}

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredShoes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MensCollections;
