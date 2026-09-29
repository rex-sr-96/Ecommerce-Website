import React from "react";

const mensHeroImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80";

function MensHero() {
  return (
    <div className="bg-(--color-contrast)">
      <div className="flex flex-col gap-10 px-6 py-10 lg:mx-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
            Men's Collection
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineered Performance,
              <span className="block text-(--color-primary-dark)">Style for Every Stride</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-white">
              Discover our latest men's shoes crafted for road running, training, executive dress wear, and casual street culture.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#mens-categories"
              className="inline-flex items-center justify-center rounded-full w-40 bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Shop Now
            </a>
            <a
              href="#mens-featured"
              className="inline-flex items-center justify-center rounded-full border border-(--color-primary) bg-white px-6 py-3 text-sm font-semibold text-(--color-primary) transition hover:bg-slate-100"
            >
              Explore Collection
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/40 lg:w-1/2">
          <img
            src={mensHeroImage}
            alt="Men's Shoes Hero"
            className="h-96 w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default MensHero;
