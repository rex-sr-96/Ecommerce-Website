// ProductCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaEye, FaCheck } from "react-icons/fa";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const isFav = isFavorite(product.id);

  // Ensure price values are numbers
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || price;

  const hasDiscount = originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    if (product?.id) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-3 transition-all duration-300 hover:-translate-y-1 hover:border-(--color-contrast) hover:shadow-xl hover:shadow-black/5 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-(--color-background)">
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
          }
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 pointer-events-none">
          {product.isLimitedEdition && (
            <span className="rounded-full bg-(--color-contrast) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-(--color-primary-dark) shadow-sm">
              Limited
            </span>
          )}
          {product.isNewArrival && !product.isLimitedEdition && (
            <span className="rounded-full bg-(--color-success) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-(--color-sale) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>
        {/* Hover Action Icons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-red-500 hover:text-white ${isFav
                ? "text-red-500 opacity-100 translate-x-0"
                : "text-(--color-secondary-text) opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isFav ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm opacity-0 translate-x-2 transition-all duration-300 delay-75 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-blue-500 hover:text-white text-(--color-secondary-text)"
            title="View Details"
          >
            <FaEye size={14} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="mt-1 line-clamp-1 text-base font-bold text-(--color-text) group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs">
          <FaStar size={12} className="text-(--color-contrast)" />
          <span className="font-bold text-(--color-text)">
            {product.rating || "4.8"}
          </span>
          <span className="text-(--color-secondary-text)">
            ({product.reviewsCount || 45})
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-(--color-border) pt-2">
          <div>
            <span className="text-lg font-extrabold text-(--color-text)">
              ₹{price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-(--color-secondary-text) line-through ml-2">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              setIsAdded(true);
              setTimeout(() => setIsAdded(false), 2000);
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold transition-colors z-10 ${isAdded
                ? "bg-(--color-success) text-white"
                : "bg-(--color-primary) text-(--color-surface) hover:bg-(--color-primary-dark)"
              }`}
          >
            {isAdded ? <FaCheck size={13} /> : <FaShoppingCart size={13} />}
            <span>{isAdded ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
