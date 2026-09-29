import React from "react";
import { FaGift, FaArrowRight } from "react-icons/fa";

const KidsOffers = () => {
  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-8 sm:p-12 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <FaGift size={13} />
              <span>Back-to-School Deal</span>
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Buy 1 Get 2nd Pair 30% OFF on Kids Shoes!
            </h2>

            <p className="text-sm sm:text-base text-white/90">
              Prepare your kids for the school term and weekend sports. Mix and match across Nike, Adidas, Puma, and Skechers. Use promo code <span className="font-mono font-bold text-slate-950 bg-amber-300 px-2 py-0.5 rounded">KIDS30</span>.
            </p>
          </div>

          <div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950 hover:shadow-lg active:scale-95">
              <span>Shop Kids Deals</span>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsOffers;
