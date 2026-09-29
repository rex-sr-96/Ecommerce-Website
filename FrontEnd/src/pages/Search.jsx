import React, { useState, useEffect } from "react";
import { searchProducts } from "../services/api";
import ProductCard from "../components/Common/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim() === "") {
        setResults([]);
        setHasSearched(false);
        return;
      }
      
      setLoading(true);
      setHasSearched(true);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-6 text-(--color-secondary-text)" size={20} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands, categories..."
                className="w-full rounded-full border border-(--color-border) bg-(--color-surface) py-5 pl-14 pr-6 text-lg font-medium shadow-sm transition-all hover:border-(--color-primary) focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20"
              />
            </div>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-3xl bg-(--color-border)" />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="mb-6 text-sm font-semibold text-(--color-secondary-text)">
                  Showing {results.length} results for "{query}"
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : hasSearched && query.trim() !== "" ? (
              <div className="py-20 text-center">
                <h3 className="text-xl font-bold text-(--color-text)">No results found</h3>
                <p className="mt-2 text-(--color-secondary-text)">
                  We couldn't find anything matching "{query}". Try different keywords or check your spelling.
                </p>
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-(--color-surface) shadow-sm ring-1 ring-(--color-border)">
                  <FaSearch size={32} className="text-(--color-border)" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-(--color-text)">Search our store</h3>
                <p className="mt-2 text-(--color-secondary-text)">
                  Find your next favorite pair of shoes
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

