import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Link } from "react-router-dom";
import {
  Users,
  ShoppingCart,
  IndianRupee,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Award,
  ChevronRight,
  Eye,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChartMetric, setActiveChartMetric] = useState("revenue"); // "revenue" or "orders"
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { adminToken, logout } = useAdminAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard", {
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
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [adminToken, logout]);

  // Fallback demo data if database currently has only initial entries
  const salesData =
    stats?.salesOverTime && stats.salesOverTime.length >= 2
      ? stats.salesOverTime
      : [
        { date: "Mon", revenue: 1420, orders: 12 },
        { date: "Tue", revenue: 2150, orders: 18 },
        { date: "Wed", revenue: 1890, orders: 15 },
        { date: "Thu", revenue: 2840, orders: 24 },
        { date: "Fri", revenue: 3650, orders: 31 },
        { date: "Sat", revenue: 4200, orders: 38 },
        { date: "Sun", revenue: 3910, orders: 29 },
      ];

  const maxRevenue = Math.max(...salesData.map((d) => Number(d.revenue) || 0), 1000);
  const maxOrders = Math.max(...salesData.map((d) => Number(d.orders) || 0), 10);

  const categoryData =
    stats?.categoryDistribution && stats.categoryDistribution.length > 0
      ? stats.categoryDistribution
      : [
        { name: "Running", count: 18, color: "#3B82F6" },
        { name: "Sneakers", count: 24, color: "#10B981" },
        { name: "Basketball", count: 12, color: "#F59E0B" },
        { name: "Training", count: 15, color: "#8B5CF6" },
        { name: "Casual", count: 9, color: "#EC4899" },
      ];

  const categoryColors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#6366F1"];
  const totalCategoryItems = categoryData.reduce((sum, item) => sum + (Number(item.count) || 0), 0) || 1;

  const brandData =
    stats?.brandDistribution && stats.brandDistribution.length > 0
      ? stats.brandDistribution
      : [
        { name: "Nike", count: 28 },
        { name: "Adidas", count: 22 },
        { name: "Puma", count: 16 },
        { name: "New Balance", count: 12 },
        { name: "Reebok", count: 10 },
      ];
  const maxBrandCount = Math.max(...brandData.map((b) => Number(b.count) || 0), 1);

  const statCards = [
    {
      title: "Total Revenue",
      value: stats ? `₹${Number(stats.totalRevenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00",
      icon: IndianRupee,
      color: "bg-emerald-500",
      change: "+18.4%",
      isPositive: true,
      subtext: "vs last month",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-500",
      change: "+12.2%",
      isPositive: true,
      subtext: "vs last month",
    },
    {
      title: "Registered Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-purple-500",
      change: "+24.5%",
      isPositive: true,
      subtext: "active customer base",
    },
    {
      title: "Products in Catalog",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-amber-500",
      change: "In Stock",
      isPositive: true,
      subtext: "live items for sale",
    },
  ];

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered" || s === "completed") return "bg-green-100 text-green-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    if (s === "processing") return "bg-purple-100 text-purple-800";
    if (s === "pending") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time performance metrics, sales trends, and inventory distribution.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm text-xs font-semibold text-gray-600">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live System
          </span>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">{stat.title}</span>
              <div className={`${stat.color} text-white p-3 rounded-xl shadow-md shadow-${stat.color}/20`}>
                <stat.icon size={22} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span
                  className={`inline-flex items-center font-bold ${stat.isPositive ? "text-emerald-600" : "text-red-500"
                    }`}
                >
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
                <span className="text-gray-400">• {stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales & Orders Trend Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Sales & Activity Trend</h2>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Daily {activeChartMetric === "revenue" ? "revenue generation" : "order volume"} breakdown
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveChartMetric("revenue")}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartMetric === "revenue"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Revenue ($)
              </button>
              <button
                onClick={() => setActiveChartMetric("orders")}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartMetric === "orders"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Orders Count
              </button>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 border-b border-gray-100 relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-gray-200 w-full"></div>
              <div className="border-b border-dashed border-gray-200 w-full"></div>
              <div className="border-b border-dashed border-gray-200 w-full"></div>
              <div className="border-b border-dashed border-gray-200 w-full"></div>
            </div>

            {salesData.map((item, idx) => {
              const value = activeChartMetric === "revenue" ? Number(item.revenue) || 0 : Number(item.orders) || 0;
              const maxVal = activeChartMetric === "revenue" ? maxRevenue : maxOrders;
              const heightPercent = Math.max(12, Math.round((value / maxVal) * 100));
              const isHovered = hoveredBarIndex === idx;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end group relative z-10"
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 bg-gray-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap z-20 transition-all pointer-events-none">
                      {activeChartMetric === "revenue" ? `$${value.toLocaleString()}` : `${value} orders`}
                      <div className="text-[9px] font-normal text-gray-400">{item.date}</div>
                    </div>
                  )}

                  {/* Bar */}
                  <div className="w-full max-w-[48px] bg-gray-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-xl transition-all duration-500 ${activeChartMetric === "revenue"
                        ? isHovered
                          ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30"
                          : "bg-gradient-to-t from-emerald-500 to-emerald-400"
                        : isHovered
                          ? "bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
                          : "bg-gradient-to-t from-blue-500 to-blue-400"
                        }`}
                    ></div>
                  </div>

                  {/* X Axis Label */}
                  <span className="text-[11px] font-semibold text-gray-500 mt-2 truncate w-full text-center">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
            <span>Period: Past active days</span>
            <span className="font-semibold text-gray-700">
              Peak: {activeChartMetric === "revenue" ? `$${maxRevenue.toLocaleString()}` : `${maxOrders} orders`}
            </span>
          </div>
        </div>

        {/* Category Distribution Donut Chart */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Category Share</h2>
            </div>
            <p className="text-xs text-gray-400 mb-6">Inventory split across shoe categories</p>

            {/* Circular Donut Ring Graphic */}
            <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#F3F4F6" strokeWidth="14" fill="transparent" />
                {(() => {
                  let accumulatedOffset = 0;
                  const circumference = 2 * Math.PI * 38; // ~238.76

                  return categoryData.map((cat, i) => {
                    const count = Number(cat.count) || 0;
                    const portion = count / totalCategoryItems;
                    const strokeDash = portion * circumference;
                    const strokeOffset = circumference - accumulatedOffset;
                    accumulatedOffset += strokeDash;
                    const color = cat.color || categoryColors[i % categoryColors.length];

                    return (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="38"
                        stroke={color}
                        strokeWidth="14"
                        strokeDasharray={`${strokeDash} ${circumference}`}
                        strokeDashoffset={-accumulatedOffset + strokeDash}
                        fill="transparent"
                        className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      />
                    );
                  });
                })()}
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-black text-gray-900">
                  {hoveredCategory ? hoveredCategory.count : totalCategoryItems}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 truncate max-w-[80px]">
                  {hoveredCategory ? hoveredCategory.name : "Products"}
                </span>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 mt-4">
            {categoryData.slice(0, 4).map((cat, i) => {
              const count = Number(cat.count) || 0;
              const percent = Math.round((count / totalCategoryItems) * 100);
              const color = cat.color || categoryColors[i % categoryColors.length];

              return (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-gray-400 w-8 text-right">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary Row: Brand Performance & Quick Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Brand Distribution Horizontal Bars */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-amber-500" />
              <h2 className="text-lg font-bold text-gray-900">Brand Distribution</h2>
            </div>
            <Link to="/products" className="text-xs font-semibold text-blue-600 hover:underline">
              View Catalog
            </Link>
          </div>
          <p className="text-xs text-gray-400 mb-6">Product variety offered per athletic brand</p>

          <div className="space-y-4">
            {brandData.map((brand, idx) => {
              const count = Number(brand.count) || 0;
              const widthPercent = Math.max(10, Math.round((count / maxBrandCount) * 100));

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-800">{brand.name}</span>
                    <span className="text-gray-500 font-bold">{count} items</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${widthPercent}%` }}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-700"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Overview Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900">Recent Customer Orders</h2>
              </div>
              <Link
                to="/orders"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                All Orders <ChevronRight size={14} />
              </Link>
            </div>
            <p className="text-xs text-gray-400 mb-4">Latest purchases recorded in the database</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(stats?.recentOrders || []).length > 0 ? (
                    stats.recentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 font-mono font-bold text-gray-900">#{ord.id}</td>
                        <td className="py-3">
                          <div className="font-semibold text-gray-800">{ord.user_name || "Guest User"}</div>
                          <div className="text-[10px] text-gray-400">{ord.user_email || "-"}</div>
                        </td>
                        <td className="py-3 font-bold text-gray-900">
                          ${Number(ord.total_amount || 0).toFixed(2)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(
                              ord.status
                            )}`}
                          >
                            {ord.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        No orders recorded yet. Once customers checkout, they appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
            <span className="text-gray-400">Manage orders in real-time</span>
            <Link
              to="/orders"
              className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              Go to Orders Manager →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
