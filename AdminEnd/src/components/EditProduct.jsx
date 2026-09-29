import { useState } from "react";

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image_url: "",
    });

    // ============ HANDLE EDIT ============
    const handleEdit = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${adminToken}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts(
                    products.map((p) => (p.id === id ? updatedProduct : p))
                );
                setEditingProduct(null); // Close modal
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    stock: "",
                    image_url: "",
                });
                alert("Product updated successfully!");
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product");
        }
    };

    // ============ OPEN EDIT MODAL ============
    const openEditModal = (product) => {
        setEditingProduct(product.id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image_url: product.image_url,
        });
    };

    // ============ HANDLE INPUT CHANGE ============
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ============ HANDLE DELETE ============
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

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
        <div>
            {/* Products Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-(--color-border)">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Stock</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="border-b border-(--color-border) hover:bg-(--color-background)"
                        >
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">${product.price}</td>
                            <td className="p-3">{product.stock}</td>
                            <td className="p-3 text-center space-x-2">
                                <button
                                    onClick={() => openEditModal(product)}
                                    className="px-3 py-1 bg-(--color-primary) text-white rounded
                             hover:bg-(--color-primary-dark) transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="px-3 py-1 bg-(--color-sale) text-white rounded
                             hover:opacity-80 transition-opacity"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-(--color-surface) rounded-2xl p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
                            Edit Product
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-(--color-text) mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--color-text) mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                    rows="3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-(--color-text) mb-1">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-(--color-text) mb-1">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--color-text) mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--color-text) mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-(--color-border) rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handleEdit(editingProduct)}
                                className="flex-1 px-4 py-2 bg-(--color-primary) text-white rounded-lg
                           hover:bg-(--color-primary-dark) font-medium transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setFormData({
                                        name: "",
                                        description: "",
                                        price: "",
                                        category: "",
                                        stock: "",
                                        image_url: "",
                                    });
                                }}
                                className="flex-1 px-4 py-2 bg-(--color-border) text-(--color-text) rounded-lg
                           hover:bg-opacity-80 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsManager;