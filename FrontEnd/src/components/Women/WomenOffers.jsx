import React from "react";
import { FaTag, FaArrowRight } from "react-icons/fa";

const WomenOffers = () => {
  return (
    <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-700 p-8 sm:p-12 shadow-2xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <FaTag size={13} />
              <span>Limited Time Offer</span>
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Women's Season End Sale: Up to 40% OFF
            </h2>

            <p className="text-sm sm:text-base text-white/90">
              Upgrade your shoe closet with extra discounts on Nike, Adidas, Puma, and Steve Madden favorites. Use code <span className="font-mono font-bold text-amber-300">WOMEN40</span> at checkout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-amber-400 hover:shadow-lg active:scale-95">
              <span>Claim Discount</span>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenOffers;
