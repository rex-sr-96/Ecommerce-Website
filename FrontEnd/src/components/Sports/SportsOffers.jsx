import React from "react";
import { FaTrophy, FaArrowRight } from "react-icons/fa";

const SportsOffers = () => {
  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 p-8 sm:p-12 shadow-2xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <FaTrophy size={13} />
              <span>Pro Athlete Deal</span>
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Sports Gear Fest: Extra 25% OFF All Athletic Shoes
            </h2>

            <p className="text-sm sm:text-base text-white/90">
              Gear up for your upcoming marathon, tournament, or gym season. Applies across Nike, Adidas, Puma, Reebok, New Balance, and Skechers. Use promo code <span className="font-mono font-bold text-slate-950 bg-amber-300 px-2 py-0.5 rounded">SPORT25</span>.
            </p>
          </div>

          <div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950 hover:shadow-lg active:scale-95">
              <span>Claim Sports Offer</span>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsOffers;
