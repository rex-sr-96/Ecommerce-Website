import React from "react";
import SectionHeader from "../Common/SectionHeader";

const ageGroups = [
  { id: "Baby", title: "Baby", age: "0 - 2 Years", desc: "Ultra-soft flexible sole booties & crib shoes", icon: "👶", color: "from-pink-500 to-rose-400" },
  { id: "Toddlers", title: "Toddlers", age: "2 - 4 Years", desc: "Easy hook & loop straps for tiny explorers", icon: "🧸", color: "from-amber-500 to-yellow-400" },
  { id: "Little Kids", title: "Little Kids", age: "4 - 8 Years", desc: "Cushioned sneakers for playground action", icon: "🎨", color: "from-emerald-500 to-teal-400" },
  { id: "Big Kids", title: "Big Kids", age: "8 - 12 Years", desc: "High-performance sports & stylish school kicks", icon: "🚀", color: "from-indigo-500 to-blue-400" }
];

const ShopByAge = ({ activeAge, onSelectAge }) => {
  return (
    <section id="kids-age" className="bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Fit For Every Stage"
          title="Shop by Age"
          subtitle="Select your child's age group for perfectly sized, ergonomic footwear."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ageGroups.map((group) => {
            const isSelected = activeAge === group.id;
            return (
              <button
                key={group.id}
                onClick={() => onSelectAge && onSelectAge(group.id)}
                className={`group flex flex-col justify-between overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-amber-500 bg-white shadow-xl ring-2 ring-amber-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                <div>
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${group.color} text-2xl text-white shadow-md`}>
                    {group.icon}
                  </div>
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    {group.age}
                  </span>
                  <h3 className="mt-1 text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600">
                    {group.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-extrabold text-slate-900 group-hover:text-amber-500">
                  <span>Browse {group.title}</span>
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

export default ShopByAge;
