import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SportsHero from "../components/Sports/SportsHero";
import ShopBySport from "../components/Sports/ShopBySport";
import ProductSectionGrid from "../components/Cards/ProductSectionGrid";
import ShopByGenderSports from "../components/Sports/ShopByGenderSports";
import BrandSection from "../components/Cards/BrandSection";
import PerformanceFeatures from "../components/Sports/PerformanceFeatures";
import SportsOffers from "../components/Sports/SportsOffers";
import CustomerReviews from "../components/Cards/Testimonial";
import { fetchProducts } from "../services/api";

function Sports() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [allSports, setAllSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const sports = data.filter(
          (s) => s.category === "Sports Shoes" || s.category === "Running Shoes" || s.sportType
        );
        setAllSports(sports);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sportFiltered = selectedSport
    ? allSports.filter((s) => s.sportType === selectedSport || s.collection === selectedSport)
    : allSports;

  const genderFiltered = selectedGender
    ? sportFiltered.filter((s) => s.gender === selectedGender)
    : sportFiltered;

  const featuredSports         = genderFiltered.filter((s) => s.isFeatured);
  const runningCollection      = genderFiltered.filter((s) => s.sportType === "Running" || s.collection === "Running");
  const trainingGymCollection  = genderFiltered.filter((s) => s.sportType === "Training" || s.sportType === "Gym" || s.collection === "Training");
  const footballCollection     = genderFiltered.filter((s) => s.sportType === "Football" || s.collection === "Football");
  const basketballCollection   = genderFiltered.filter((s) => s.sportType === "Basketball" || s.collection === "Basketball");
  const outdoorHikingCollection = genderFiltered.filter((s) => s.sportType === "Hiking" || s.collection === "Hiking");
  const newArrivalsSports      = genderFiltered.filter((s) => s.isNewArrival);
  const bestSellersSports      = genderFiltered.filter((s) => s.isBestSeller);

  const fallback = allSports;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <SportsHero />

      <ShopBySport activeSport={selectedSport}
        onSelectSport={(sport) => setSelectedSport(selectedSport === sport ? null : sport)} />

      {(selectedSport || selectedGender) && (
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-xs">
          <span>
            Filtering Sports Shoes by:{" "}
            {selectedSport && <strong className="mr-2 text-emerald-700">Sport: {selectedSport}</strong>}
            {selectedGender && <strong className="text-emerald-700">Gender: {selectedGender}</strong>}
          </span>
          <button onClick={() => { setSelectedSport(null); setSelectedGender(null); }}
            className="text-emerald-800 font-bold underline hover:text-slate-900">Clear Filters</button>
        </div>
      )}

      <ProductSectionGrid id="featured-sports" badge="Athlete Choice" title="Featured Sports Shoes"
        subtitle="High-performance athletic footwear tested for durability and responsiveness."
        products={featuredSports.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Marathon & Track" title="Running Collection"
        subtitle="Plush foam cushioning and lightweight road running engineering."
        products={(runningCollection.length > 0 ? runningCollection : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Cross-Training" title="Training & Gym Collection"
        subtitle="Firm heel stability and lateral support for weightlifting & HIIT workouts."
        products={(trainingGymCollection.length > 0 ? trainingGymCollection : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Turf & Cleats" title="Football Collection"
        subtitle="Precision ball-control texture and firm ground stud configurations."
        products={(footballCollection.length > 0 ? footballCollection : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Court Lockdown" title="Basketball Collection"
        subtitle="High-top ankle collar support and multidirectional court traction."
        products={(basketballCollection.length > 0 ? basketballCollection : fallback).slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Rugged Trail" title="Outdoor & Hiking"
        subtitle="Aggressive chevron lugs and waterproof protection for rugged wilderness."
        products={(outdoorHikingCollection.length > 0 ? outdoorHikingCollection : fallback).slice(0, 4)} loading={loading} />

      <ShopByGenderSports activeGender={selectedGender}
        onSelectGender={(g) => setSelectedGender(selectedGender === g ? null : g)} />

      <BrandSection targetBrands={["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Skechers"]}
        title="Shop Sports Shoes by Brand" subtitle="World-class performance engineering from top international athletic brands." />
      <PerformanceFeatures />

      <ProductSectionGrid badge="Latest Tech" title="New Arrivals"
        subtitle="The newest sports shoe silhouettes and cushion innovations."
        products={newArrivalsSports.slice(0, 4)} loading={loading} />
      <ProductSectionGrid badge="Pro Approved" title="Best Sellers"
        subtitle="The most trusted sports shoes chosen by athletes and runners globally."
        products={bestSellersSports.slice(0, 4)} loading={loading} />

      <SportsOffers />
      <CustomerReviews title="Athlete & Customer Reviews"
        subtitle="Real performance reviews from runners, lifters, and court competitors." />
      <Footer />
    </div>
  );
}

export default Sports;
