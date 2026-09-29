const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Convert DB snake_case fields to camelCase used by the frontend
function normalize(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    if (camel === "brandName")         { result.brand        = value; }
    else if (camel === "categoryName") { result.category     = value; }
    else if (camel === "sportType")    { result.sportType    = value; }
    else if (camel === "targetGender") { result.targetGender = value; }
    else if (camel === "ageGroup")     { result.ageGroup     = value; }
    else                               { result[camel]       = value; }
  }
  return result;
}

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// PRODUCTS
export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `/api/products${qs ? `?${qs}` : ""}`;
  const data = await apiFetch(url);
  return data.map(normalize);
}

export async function fetchProductById(id) {
  const data = await apiFetch(`/api/products/${id}`);
  return normalize(data);
}

// BRANDS
export async function fetchBrands() {
  const data = await apiFetch("/api/brands");
  return data.map(normalize);
}

// TESTIMONIALS
export async function fetchTestimonials() {
  const data = await apiFetch("/api/testimonials");
  return data.map(normalize);
}

// CONVENIENCE HELPERS
export const fetchMensProducts           = ()      => fetchProducts({ gender: "Men"                    });
export const fetchWomensProducts         = ()      => fetchProducts({ gender: "Women"                  });
export const fetchKidsProducts           = ()      => fetchProducts({ gender: "Kids"                   });
export const fetchFeaturedProducts       = ()      => fetchProducts({ isFeatured: "true"               });
export const fetchNewArrivals            = ()      => fetchProducts({ isNewArrival: "true"             });
export const fetchBestSellers            = ()      => fetchProducts({ isBestSeller: "true"             });
export const fetchTrendingProducts       = ()      => fetchProducts({ isTrending: "true"               });
export const fetchLimitedEditionProducts = ()      => fetchProducts({ isLimitedEdition: "true"         });
export const fetchLastChanceProducts     = ()      => fetchProducts({ isLastChance: "true"             });
export const fetchProductsByBrand        = (brand, gender) => fetchProducts({ brand, ...(gender ? { gender } : {}) });
export const fetchKidsSchoolProducts     = ()      => fetchProducts({ gender: "Kids", category: "School Shoes" });
export const searchProducts              = (q)     => fetchProducts({ search: q                        });

export async function fetchSportsProducts() {
  const data = await apiFetch("/api/sports");
  return data.map(normalize);
}
