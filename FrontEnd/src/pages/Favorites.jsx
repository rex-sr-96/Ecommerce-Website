import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/Common/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-(--color-text)">Your Wishlist</h1>
              <p className="mt-2 text-sm text-(--color-secondary-text)">
                {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--color-surface) shadow-sm ring-1 ring-(--color-border)">
                <FaHeart size={32} className="text-red-500/20" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-(--color-text)">Your wishlist is empty</h2>
              <p className="mt-2 max-w-md text-(--color-secondary-text)">
                Found something you like? Tap the heart icon on any item to save it here for later.
              </p>
              <Link
                to="/home"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-(--color-primary) px-8 text-sm font-semibold text-(--color-surface) transition hover:bg-(--color-primary-dark)"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;

