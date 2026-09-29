import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../Common/SectionHeader";

const categories = [
  {
    title: "Shop Men's Shoes",
    subtitle: "Engineered for performance, comfort & lifestyle",
    link: "/mens",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    badge: "Men's Collection",
    itemCount: "140+ Products"
  },
  {
    title: "Shop Women's Shoes",
    subtitle: "Elegance, trendsetting silhouettes & supreme cushioning",
    link: "/women",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    badge: "Women's Collection",
    itemCount: "165+ Products"
  },
  {
    title: "Shop Kids' Shoes",
    subtitle: "Durable, vibrant & protective footwear for young explorers",
    link: "/kids",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    badge: "Kids' Collection",
    itemCount: "95+ Products"
  }
];

const GenderCategories = () => {
  return (
    <section className="bg-(--color-background) py-12 px-4 sm:px-6 lg:px-8 border-b border-(--color-border)">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Browse By Department"
          title="Explore Footwear Collections"
          subtitle="Find the tailored footwear line crafted for every family member."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative flex h-96 overflow-hidden rounded-3xl bg-(--color-primary) shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0  from-black via-black/30 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                <span className="self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {cat.badge}
                </span>

                <div>
                  <span className="text-xs font-medium text-(--color-contrast)">{cat.itemCount}</span>
                  <h3 className="mt-1 text-2xl font-bold text-white group-hover:text-(--color-contrast) transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 line-clamp-2">
                    {cat.subtitle}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-(--color-surface) px-4 py-2.5 text-xs font-bold text-(--color-primary-dark) transition group-hover:bg-(--color-contrast)">
                    <span>Shop Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenderCategories;
