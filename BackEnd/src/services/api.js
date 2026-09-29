export async function fetchProducts(params = "") {
    const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/products${params}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
}

