import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";
import { fetchKidsSchoolProducts } from "../../services/api";
import { FaGraduationCap } from "react-icons/fa";

const SchoolCollection = () => {
  const [schoolShoes, setSchoolShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKidsSchoolProducts()
      .then(setSchoolShoes)
      .catch((err) => console.error("Failed to fetch school shoes:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="school-collection" className="bg-slate-900 py-16 text-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/30">
              <FaGraduationCap size={14} />
              <span>Back To School</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">
              School Collection
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Uniform-compliant black & white shoes engineered for all-day classroom comfort and playground endurance.
            </p>
          </div>

          <span className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-cyan-400 border border-slate-700">
            Scratch & Scuff Resistant
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-slate-800" />
            ))}
          </div>
        ) : schoolShoes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {schoolShoes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No school shoes available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolCollection;
