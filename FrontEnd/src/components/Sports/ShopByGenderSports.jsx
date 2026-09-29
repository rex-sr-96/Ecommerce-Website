import React from "react";
import SectionHeader from "../Common/SectionHeader";

const genders = [
  { id: "Men", title: "Men's Sports Shoes", badge: "Men's Line", desc: "Engineered for heavy impact & athletic strength", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: "Women", title: "Women's Sports Shoes", badge: "Women's Line", desc: "Cushioned, anatomical fit for running & training", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
  { id: "Kids", title: "Kids' Sports Shoes", badge: "Kids' Line", desc: "Non-marking soles for gym class & active play", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80" }
];

const ShopByGenderSports = ({ activeGender, onSelectGender }) => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Ergonomic Sizing"
          title="Shop by Gender"
          subtitle="Explore sports shoes tailored specifically for men, women, and young athletes."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {genders.map((item) => {
            const isSelected = activeGender === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectGender && onSelectGender(item.id)}
                className={`group relative flex h-80 overflow-hidden rounded-3xl bg-slate-900 text-left shadow-md transition-all duration-300 ${
                  isSelected ? "ring-4 ring-emerald-500 shadow-2xl scale-102" : "hover:-translate-y-1.5 hover:shadow-xl"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-65 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                  <span className="self-start rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {item.badge}
                  </span>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2">
                      {item.desc}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950">
                      <span>Select Category</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByGenderSports;
