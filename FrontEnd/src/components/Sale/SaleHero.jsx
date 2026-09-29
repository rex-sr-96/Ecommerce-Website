import React, { useState, useEffect } from "react";

const saleHeroImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80";

function SaleHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-(--color-contrast)">
      <div className="flex flex-col gap-10 px-6 py-10 lg:mx-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
            <span>Special Promotion</span>
            <span className="font-mono text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">
              Ends: {String(timeLeft.days).padStart(2, "0")}d : {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Big Shoe Sale,
              <span className="block text-(--color-primary-dark)">Up to 60% OFF Top Brands</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-white">
              Limited time markdowns on Nike, Adidas, Puma, Reebok, and New Balance styles. Massive savings across all categories.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#mens-sale"
              className="inline-flex items-center justify-center rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Shop Men's Sale
            </a>
            <a
              href="#womens-sale"
              className="inline-flex items-center justify-center rounded-full border border-(--color-primary) bg-white px-6 py-3 text-sm font-semibold text-(--color-primary) transition hover:bg-slate-100"
            >
              Shop Women's Sale
            </a>
            <a
              href="#kids-sale"
              className="inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Shop Kids' Sale
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/40 lg:w-1/2">
          <img
            src={saleHeroImage}
            alt="Big Shoe Sale Hero"
            className="h-96 w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default SaleHero;
