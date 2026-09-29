import { useState, useEffect } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";
import { fetchProducts } from "../../services/api";

// Collection tabs derived from the "collection" field in products
const COLLECTION_TABS = [
  { name: "Everyday",  icon: "👟", desc: "Versatile everyday styles for any occasion." },
  { name: "Running",   icon: "🏃‍♀️", desc: "High-performance running shoes built for speed and comfort." },
  { name: "Training",  icon: "💪", desc: "Cross-training footwear engineered for gym and HIIT sessions." },
  { name: "Premium",   icon: "✨", desc: "Luxury crafted styles for elevated occasions." },
];

const WomenCollections = () => {
  const [activeTab, setActiveTab] = useState("Everyday");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts({ gender: "Women" });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching women's products:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.collection === activeTab
  );

  if (loading) {
    return (
      <section className="bg-white py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-slate-500">Loading collections...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Curated Edit"
          title="Women's Collection"
          subtitle="Explore specially assembled lines suited for daily wear, workouts, or formal events."
        />

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {COLLECTION_TABS.map((tab) => (
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

        {/* Description Banner */}
        {COLLECTION_TABS.find((c) => c.name === activeTab) && (
          <div className="mb-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 sm:p-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">
              {COLLECTION_TABS.find((c) => c.name === activeTab).desc}
            </p>
            <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
              {filteredProducts.length} Items
            </span>
          </div>
        )}

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center text-slate-500">
            No products found in the <strong>{activeTab}</strong> collection yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default WomenCollections;
