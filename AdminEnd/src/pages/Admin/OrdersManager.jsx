import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const { adminToken, logout } = useAdminAuth();

  useEffect(() => {
    fetchOrders();
  }, [adminToken]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (response.status === 401) {
        logout();
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("TOKEN:", adminToken);

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(orderId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    } finally {
      setStatusUpdating(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "delivered") {
      return "bg-green-100 text-green-800";
    }
    if (s === "pending" || s === "processing") {
      return "bg-yellow-100 text-yellow-800";
    }
    if (s === "cancelled") {
      return "bg-red-100 text-red-800";
    }
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Orders</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Total Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">#{order.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{order.user_name || "Guest"}</div>
                      <div className="text-xs text-gray-500">{order.user_email || "-"}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      ${Number(order.total_amount || 0).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status || "Pending"}
                        disabled={statusUpdating === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-2.5 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;