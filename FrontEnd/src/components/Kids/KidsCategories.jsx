import React from "react";
import SectionHeader from "../Common/SectionHeader";

const categories = [
  { name: "Sneakers", icon: "👟", count: "34 Items" },
  { name: "School Shoes", icon: "🏫", count: "20 Items" },
  { name: "Sports Shoes", icon: "⚽", count: "28 Items" },
  { name: "Running Shoes", icon: "🏃‍♂️", count: "25 Items" },
  { name: "Sandals", icon: "🩴", count: "16 Items" },
  { name: "Boots", icon: "🥾", count: "12 Items" },
  { name: "Slippers", icon: "🦩", count: "14 Items" }
];

const KidsCategories = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Kids Department"
          title="Shop by Category"
          subtitle="Explore durable footwear for play, school uniform standards, sports, and home relaxation."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                  isSelected
                    ? "border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-500"
                    : "border-slate-200 bg-white hover:border-amber-400 hover:shadow-md"
                }`}
              >
                <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </span>
                <span className="text-sm font-bold text-slate-900 line-clamp-1">{cat.name}</span>
                <span className="mt-1 text-[11px] text-slate-500">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KidsCategories;
