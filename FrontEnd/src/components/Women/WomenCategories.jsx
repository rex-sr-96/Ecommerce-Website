import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";

const MensCategories = ({ activeCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/womens-categories");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="bg-(--color-background) py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-(--color-secondary-text)">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="mens-categories" className="bg-(--color-background) py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Men's Department"
          title="Shop by Category"
          subtitle="Discover specialized Men's footwear from athletic runners to executive leather formal shoes."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    if (isSelected) {
                      onSelectCategory(null); // Toggle off
                    } else {
                      onSelectCategory(cat.name); // Toggle on
                    }
                  }
                }}
                className={`group flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${isSelected
                  ? "border-(--color-primary) bg-(--color-surface) shadow-lg ring-2 ring-(--color-primary)"
                  : "border-(--color-border) bg-(--color-surface) hover:border-(--color-primary) hover:shadow-md"
                  }`}
              >
                <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </span>
                <span className="text-sm font-bold text-(--color-text) line-clamp-1">
                  {cat.name}
                </span>
                <span className="mt-1 text-[11px] text-(--color-secondary-text) font-medium">
                  {cat.count} Items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MensCategories;