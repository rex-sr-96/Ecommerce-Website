import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { LayoutDashboard, Users, ShoppingCart, Package, LogOut } from "lucide-react";

const AdminLayout = () => {
  const { logout, adminUser } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-800">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/products" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded transition-colors">
            <Package size={20} /> Products
          </Link>
          <Link to="/orders" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded transition-colors">
            <ShoppingCart size={20} /> Orders
          </Link>
          <Link to="/users" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded transition-colors">
            <Users size={20} /> Users
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 hover:bg-red-900/50 text-red-400 rounded transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              Welcome, {adminUser?.name || 'Admin'}
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
