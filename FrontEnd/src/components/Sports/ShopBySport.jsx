import React from "react";
import SectionHeader from "../Common/SectionHeader";

const sports = [
  { name: "Running", icon: "🏃‍♂️", count: "45 Models", desc: "Road & track distance runners" },
  { name: "Training", icon: "🏋️‍♂️", count: "38 Models", desc: "Cross-training & agility shoes" },
  { name: "Football", icon: "⚽", count: "24 Models", desc: "Firm ground & turf cleats" },
  { name: "Basketball", icon: "🏀", count: "30 Models", desc: "High-top court lockdown" },
  { name: "Tennis", icon: "🎾", count: "18 Models", desc: "Clay & hard court stability" },
  { name: "Cricket", icon: "🏏", count: "15 Models", desc: "Spiked & rubber turf shoes" },
  { name: "Hiking", icon: "🥾", count: "22 Models", desc: "Trail grip & outdoor boots" },
  { name: "Gym", icon: "🧘‍♂️", count: "32 Models", desc: "Flexible lifting & cardio trainers" }
];

const ShopBySport = ({ activeSport, onSelectSport }) => {
  return (
    <section id="shop-by-sport" className="bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Tailored Discipline"
          title="Shop by Sport"
          subtitle="Choose your athletic discipline for specialized traction, support, and sole engineering."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {sports.map((sport) => {
            const isSelected = activeSport === sport.name;
            return (
              <button
                key={sport.name}
                onClick={() => onSelectSport && onSelectSport(sport.name)}
                className={`group flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                  isSelected
                    ? "border-emerald-500 bg-white shadow-lg ring-2 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md"
                }`}
              >
                <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {sport.icon}
                </span>
                <span className="text-sm font-bold text-slate-900 line-clamp-1">{sport.name}</span>
                <span className="mt-1 text-[11px] text-slate-500 font-medium">{sport.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopBySport;
