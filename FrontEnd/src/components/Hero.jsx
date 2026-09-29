import React from "react";
import { Truck, Lock, Undo2 } from "lucide-react"

const heroImage = "https://static.vecteezy.com/system/resources/thumbnails/025/496/591/small/modern-shoe-store-display-showcases-elegant-leather-collection-for-sale-generated-by-ai-free-photo.jpg";

const features = [
    { icon: Truck, label: "Fast Delivery" },
    { icon: Lock, label: "Secure Payment" },
    { icon: Undo2, label: "Easy Returns" },
];

function Hero() {
    return (
        <div className="bg-(--color-contrast)">
            <div className="flex flex-col gap-10 px-6 py-10 lg:mx-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-8">
                    <div className="inline-flex items-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
                        New Collection
                    </div>
                    <div className="space-y-5">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Everything You Love,
                            <span className="block text-(--color-primary-dark)">All in One Place</span>
                        </h1>
                        <p className="max-w-xl text-base leading-8 text-white">
                            Explore our latest collection of quality products designed for your everyday needs.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button className="rounded-full w-40 bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
                            Shop Now
                        </button>
                        <button className="rounded-full border border-(--color-primary) bg-white px-6 py-3 text-sm font-semibold text-(--color-primary) transition hover:bg-slate-100">
                            Explore Collection
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/40">
                    <img src={heroImage} alt="Hero" className="h-96 w-full object-cover transition duration-500 hover:scale-105" />
                </div>
            </div>
        </div>
    );
}

export default Hero;