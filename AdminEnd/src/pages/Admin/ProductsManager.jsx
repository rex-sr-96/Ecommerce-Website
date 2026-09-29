import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Plus, Trash2, Edit, X } from "lucide-react";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { adminToken } = useAdminAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "10",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setIsAdding(true);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "10",
      image_url: "",
    });
  };

  const openEditModal = (product) => {
    setIsAdding(false);
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category_name || product.category || "",
      stock: product.stock !== undefined && product.stock !== null ? String(product.stock) : "0",
      image_url: product.image || product.image_url || "",
    });
  };

  const closeModal = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "10",
      image_url: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isAdding) {
        const response = await fetch("http://localhost:5000/api/admin/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            ...formData,
            stock: parseInt(formData.stock) || 0,
          }),
        });

        if (response.ok) {
          const newProduct = await response.json();
          setProducts([newProduct, ...products]);
          closeModal();
          alert("Product added successfully!");
        } else {
          alert("Failed to add product");
        }
      } else if (editingProduct) {
        const response = await fetch(
          `http://localhost:5000/api/admin/products/${editingProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              ...formData,
              stock: parseInt(formData.stock) || 0,
            }),
          }
        );

        if (response.ok) {
          const updatedProduct = await response.json();
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id
                ? { ...p, ...updatedProduct, stock: parseInt(formData.stock) || 0 }
                : p
            )
          );
          closeModal();
          alert("Product updated successfully!");
        } else {
          alert("Failed to update product");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <button
          onClick={openAddModal}
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Stock</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Brand</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => {
                  const stockNum = Number(product.stock ?? 0);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <img
                          src={product.image || "https://placehold.co/100x100"}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border"
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-800">{product.name}</td>
                      <td className="p-4 font-semibold text-gray-900">
                        ₹{Number(product.price).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${stockNum > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {stockNum > 0 ? `${stockNum} in stock` : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {product.category_name || product.category || "-"}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {product.brand_name || product.brand || "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {(editingProduct || isAdding) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isAdding ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nike Air Max"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                    required
                  />
                  <span className="text-[11px] text-gray-500">Set 0 for Out of Stock</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Running Shoes"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  {isAdding ? "Add Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
