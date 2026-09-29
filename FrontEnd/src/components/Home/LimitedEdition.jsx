import React, { useEffect, useState } from "react";
import ProductCard from "../Common/ProductCard";
import { fetchLimitedEditionProducts } from "../../services/api";
import { FaFire, FaClock } from "react-icons/fa";

const LimitedEdition = () => {
  const [limitedShoes, setLimitedShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLimitedEditionProducts()
      .then(setLimitedShoes)
      .catch((err) => console.error("Failed to fetch limited edition products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-(--color-primary-dark) py-16 text-white px-4 sm:px-6 lg:px-8 border-t border-(--color-border)">
      <div className="mx-auto max-w-7xl">
        {/* Banner header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl from-(--color-primary) via-slate-900 to-(--color-contrast)/20 p-8 sm:p-12 shadow-2xl border border-(--color-contrast)/30">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-(--color-contrast) backdrop-blur-md border border-(--color-contrast)/40">
              <FaFire size={14} />
              <span>Exclusive Drop</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Limited Edition Releases
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Hand-numbered collector pairs, rare colorways, and hype collaborations. Once sold out, they are gone forever.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm border border-slate-700">
                <FaClock className="text-(--color-contrast)" />
                <span>Next drop in: 04d : 12h : 38m</span>
              </div>
              <button className="rounded-xl bg-(--color-contrast) px-6 py-2.5 text-xs font-bold text-(--color-primary-dark) transition hover:bg-amber-300">
                Unlock VIP Access
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/10" />
            ))}
          </div>
        ) : limitedShoes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {limitedShoes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No limited edition products available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default LimitedEdition;
