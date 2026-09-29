import React from "react";
import { FaTag, FaArrowRight } from "react-icons/fa";

const MensOffers = () => {
  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-red from-blue-700 via-indigo-800 to-purple-900 p-8 sm:p-12 shadow-2xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <FaTag size={13} />
              <span>Exclusive Member Deal</span>
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Men's Athletic & Luxury Shoes: Up to 35% OFF
            </h2>

            <p className="text-sm sm:text-base text-white/90">
              Save big on Nike, Adidas, New Balance, and Clarks bestsellers. Use promo code <span className="font-mono font-bold text-amber-300">MEN35</span> at checkout.
            </p>
          </div>

          <div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-8 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-white hover:shadow-lg active:scale-95">
              <span>Claim Discount</span>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MensOffers;
