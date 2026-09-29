import React, { useState, useEffect } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";
import { fetchSportsProducts } from "../../services/api";

const features = [
  { id: "Lightweight", title: "Lightweight", icon: "🪶", desc: "Featherlight materials reducing athlete fatigue" },
  { id: "Breathable", title: "Breathable", icon: "💨", desc: "Engineered mesh upper for heat & moisture dissipation" },
  { id: "Cushioned", title: "Cushioned", icon: "☁️", desc: "High impact energy return foam & air units" },
  { id: "Flexible", title: "Flexible", icon: "🔄", desc: "Multi-directional flex grooves for natural foot movement" },
  { id: "High Grip", title: "High Grip", icon: "🎯", desc: "Rubber traction outsoles for turf, court & mud grip" },
];

const PerformanceFeatures = () => {
  const [activeFeature, setActiveFeature] = useState("Lightweight");
  const [sportsShoes, setSportsShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSportsProducts()
      .then(setSportsShoes)
      .catch((err) => console.error("Failed to fetch sports products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredShoes = sportsShoes.filter(
    (s) => s.features && s.features.includes(activeFeature)
  );

  const displayShoes = (filteredShoes.length > 0 ? filteredShoes : sportsShoes).slice(0, 4);

  return (
    <section className="bg-slate-900 py-16 text-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Tech Innovation"
          title="Performance Features"
          subtitle="Select a performance technology to find sports shoes designed for your specific physical requirement."
        />

        {/* Feature Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {features.map((feat) => {
            const isSelected = activeFeature === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeature(feat.id)}
                className={`flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/20 text-white shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400"
                    : "border-slate-800 bg-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                }`}
              >
                <span className="text-3xl mb-1">{feat.icon}</span>
                <span className="text-sm font-extrabold">{feat.title}</span>
                <span className="mt-1 text-[11px] text-slate-400 font-medium">{feat.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Shoes */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-slate-800" />
            ))}
          </div>
        ) : displayShoes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayShoes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No sports shoes found for this feature.
          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceFeatures;
