import React from "react";
import SectionHeader from "../Common/SectionHeader";

const discountTiers = [
  { id: "under20", title: "Under 20% Off", badge: "Light Savings", desc: "Popular new arrivals & classic restocks", min: 0, max: 20, color: "from-blue-600 to-indigo-600" },
  { id: "20to40", title: "20% - 40% Off", badge: "Sweet Spot", desc: "Top athletic runners & court sneakers", min: 20, max: 40, color: "from-emerald-600 to-teal-600" },
  { id: "40to60", title: "40% - 60% Off", badge: "Mega Deals", desc: "Massive markdowns on top global brands", min: 40, max: 60, color: "from-amber-500 to-orange-600" },
  { id: "60plus", title: "60%+ Off", badge: "Clearance Out", desc: "Final clearance & last chance limited pairs", min: 60, max: 100, color: "from-rose-600 to-red-700" }
];

const ShopByDiscount = ({ activeTier, onSelectTier }) => {
  return (
    <section className="bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Discount Tiers"
          title="Shop by Discount"
          subtitle="Filter footwear markdowns based on discount percentage brackets."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {discountTiers.map((tier) => {
            const isSelected = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => onSelectTier && onSelectTier(tier.id)}
                className={`group flex flex-col justify-between rounded-3xl border p-6 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-amber-500 bg-white shadow-xl ring-2 ring-amber-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                <div>
                  <div className={`mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${tier.color} px-4 py-2 text-xs font-black uppercase text-white shadow-md`}>
                    {tier.badge}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {tier.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600">
                    {tier.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-extrabold text-slate-900 group-hover:text-amber-500">
                  <span>Browse {tier.title}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByDiscount;
