import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaPlus,
  FaTrash,
  FaPhone,
  FaArrowRight
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { AddressCards, AddAddressForm } from "../Cards/Address";

const Profile = () => {

  const { user, logout, updateUserProfile, token } = useAuth();

  const { favorites, removeFromFavorites } = useFavorites();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);

  // Active tab
  const activeTab = searchParams.get("tab") || "personal";

  // Edit personal information
  const [isEditing, setIsEditing] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState("");

  // Add address form visibility
  const [isAddress, setIsAddress] = useState(false);

  // =====================================================
  // USER INFORMATION
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    Address_2: "",
    city: "",
    state: "",
    zip_Code: "",
    country: "",
  });

  const [userInfo, setUserInfo] = useState(null);

  // =====================================================
  // ADDRESSES
  // =====================================================

  const [addresses, setAddresses] = useState([]);

  // =====================================================
  // NEW ADDRESS FORM
  // =====================================================

  const [addressForm, setAddressForm] = useState({
    type: "Home",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    zip_Code: "",
    isDefault: false,
  });

  // =====================================================
  // TAB CHANGE
  // =====================================================

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  // =====================================================
  // ORDER HISTORY
  // =====================================================

  useEffect(() => {
    const orderHistory = async () => {
      try {
        const authToken = token || localStorage.getItem("userToken");

        if (!authToken) {
          alert("No Token Found");
          return;
        }

        if (!user?.id) {
          console.log("User ID not found");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/user/orders/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
        console.log("User Orders:", data);

      } catch (error) {
        console.error("Order History Error:", error);
      }
    };

    orderHistory();
  }, [token, user?.id]);

  // =====================================================
  // FETCH USER INFORMATION
  // =====================================================

  useEffect(() => {

    const fetchUserData = async () => {

      try {

        const authToken =
          token || localStorage.getItem("userToken");

        if (!authToken) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("API response:", data);

        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          console.error(
            "User fetch failed:",
            data
          );
          return;
        }

        const fetchedUser =
          data.user || data;

        setUserInfo(fetchedUser);

        // Personal profile form
        setFormData({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",

          phone:
            fetchedUser.phone_number ||
            fetchedUser.phone ||
            "",

          address:
            fetchedUser.address || "",

          Address_2:
            fetchedUser.Address_2 || "",

          city:
            fetchedUser.city || "",

          state:
            fetchedUser.state || "",

          zip_Code:
            fetchedUser.zip_code ||
            fetchedUser.zipCode ||
            "",

          country:
            fetchedUser.country ||
            fetchedUser.region ||
            "",
        });

        // New address form
        setAddressForm((prev) => ({
          ...prev,

          name:
            fetchedUser.name || "",

          email:
            fetchedUser.email || "",

          phone:
            fetchedUser.phone_number ||
            fetchedUser.phone ||
            "",
        }));

      } catch (error) {

        console.error(
          "Error fetching user:",
          error
        );

      }

    };

    fetchUserData();

  }, [token]);

  // =====================================================
  // FETCH ALL SAVED ADDRESSES
  // =====================================================

  useEffect(() => {

    const fetchAddresses = async () => {

      try {

        const authToken =
          token || localStorage.getItem("userToken");

        if (!authToken) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/user/addresses",
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${authToken}`,
            },
          }
        );

        const data =
          await response.json();

        console.log(
          "Addresses response:",
          data
        );

        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          console.error(
            "Address fetch failed:",
            data
          );
          return;
        }

        setAddresses(
          data.addresses || []
        );

      } catch (error) {

        console.error(
          "Error fetching addresses:",
          error
        );

      }

    };

    fetchAddresses();

  }, [token]);

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const saveProfile = async (e) => {

    e.preventDefault();

    try {

      const authToken =
        token ||
        localStorage.getItem("userToken");

      if (!authToken) {

        console.error(
          "No token found"
        );

        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${authToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data =
        await response.json();

      console.log(
        "Update response:",
        data
      );

      if (!response.ok) {

        console.error(
          "Profile update failed:",
          data
        );

        return;
      }

      console.log(
        "Profile updated:",
        data.user
      );

      setUserInfo(data.user);

      setIsEditing(false);

      setUpdateSuccess(
        "Profile updated successfully!"
      );

      setTimeout(() => {
        setUpdateSuccess("");
      }, 3000);

    } catch (error) {

      console.error(
        "Error updating profile:",
        error
      );

    }

  };

  // =====================================================
  // ADD NEW ADDRESS
  // =====================================================

  const handleAddAddress = async (e) => {

    e.preventDefault();

    try {

      const authToken =
        token ||
        localStorage.getItem("userToken");

      if (!authToken) {

        console.error(
          "No token found"
        );

        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/user/addresses",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${authToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            addressForm
          ),
        }
      );

      const data =
        await response.json();

      console.log(
        "Add address response:",
        data
      );

      if (!response.ok) {

        console.error(
          "Add address failed:",
          data
        );

        return;
      }

      console.log(
        "Address added:",
        data.address
      );

      // Add new address to current UI
      setAddresses((prev) => [
        ...prev,
        data.address,
      ]);

      // Close address form
      setIsAddress(false);

      // Reset address form
      setAddressForm({
        type: "Home",

        name:
          userInfo?.name ||
          user?.name ||
          "",

        email:
          userInfo?.email ||
          user?.email ||
          "",

        phone:
          userInfo?.phone_number ||
          userInfo?.phone ||
          user?.phone ||
          "",

        address: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false,
      });

    } catch (error) {
      console.error("Error adding address:", error);
    }

  };

  // =====================================================
  // DELETE ADDRESS
  // =====================================================

  const handleDeleteAddress = async (id) => {
    try {
      const authToken = token || localStorage.getItem("userToken");
      if (!authToken) return;

      const response = await fetch(`http://localhost:5000/api/user/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error("Delete address failed");
        return;
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // =====================================================
  // SET DEFAULT ADDRESS
  // =====================================================

  const handleSetDefaultAddress = async (id) => {
    try {
      const authToken = token || localStorage.getItem("userToken");
      if (!authToken) return;

      const response = await fetch(`http://localhost:5000/api/user/addresses/${id}/default`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error("Set default address failed");
        return;
      }

      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };
  // =====================================================
  // PASSWORD
  // =====================================================

  const [passwordState, setPasswordState] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordMsg, setPasswordMsg] =
    useState("");

  const handlePasswordChange = (e) => {

    e.preventDefault();

    if (
      passwordState.newPassword !==
      passwordState.confirmPassword
    ) {

      setPasswordMsg(
        "New passwords do not match!"
      );

      return;
    }

    if (
      passwordState.newPassword.length < 6
    ) {

      setPasswordMsg(
        "Password must be at least 6 characters!"
      );

      return;
    }

    setPasswordMsg(
      "Password changed successfully!"
    );

    setPasswordState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setPasswordMsg("");
    }, 3000);

  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };
  // If user is not logged in, show guest prompt with login action

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-(--color-background)">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl border border-(--color-border) bg-(--color-surface) p-8 text-center shadow-lg">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-(--color-primary)/5 text-(--color-primary) ring-1 ring-(--color-primary)/20 mb-6">
              <FaUser size={32} />
            </div>
            <h2 className="text-2xl font-black text-(--color-text)">Sign in to view your profile</h2>
            <p className="mt-2 text-sm text-(--color-secondary-text)">
              Access your order history, manage saved addresses, and keep track of your favorites.
            </p>
            <div className="mt-8 space-y-3">
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-xl bg-(--color-primary) py-3.5 text-sm font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) shadow-md"
              >
                Sign In / Register
              </Link>
              <Link
                to="/home"
                className="flex w-full items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface) py-3 text-sm font-semibold text-(--color-text) hover:bg-(--color-background) transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const firstLetter = (user.name || user.email || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb / Top greeting */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-(--color-text)">My Account</h1>
              <p className="text-xs sm:text-sm text-(--color-secondary-text)">
                Manage your personal details, order history, and security preferences
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-red-200 bg-red-50/80 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:border-red-300 cursor-pointer"
            >
              <FaSignOutAlt size={13} />
              <span>Log Out</span>
            </button>
          </div>

          {updateSuccess && (
            <div className="mb-6 flex items-center gap-2 rounded-2xl bg-green-50 p-4 text-xs sm:text-sm font-bold text-green-700 border border-green-200 shadow-xs animate-in fade-in">
              <FaCheck className="text-green-500 shrink-0" />
              <span>{updateSuccess}</span>
            </div>
          )}

          {/* Profile Content Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">
              {/* User Overview Card */}
              <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-2xl shadow-md ring-2 ring-amber-300">
                      {firstLetter}
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white" title="Active">
                      <FaCheck size={9} className="text-white" />
                    </span>
                  </div>

                  <div className="overflow-hidden">
                    <h2 className="truncate text-lg font-black text-(--color-text)">
                      {user.name || "Customer"}
                    </h2>
                    <p className="truncate text-xs text-(--color-secondary-text)">
                      {user.email}
                    </p>
                    <span className="mt-1.5 inline-block rounded-md bg-(--color-contrast)/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black ring-1 ring-(--color-contrast)/30">
                      {user.role === "admin" ? "Admin Member" : "Verified Customer"}
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-(--color-border) pt-4 text-center">
                  <div className="rounded-xl bg-(--color-background) p-2.5">
                    <span className="block text-base font-black text-(--color-text)">{orders.length}</span>
                    <span className="text-[10px] font-semibold text-(--color-secondary-text) uppercase">Orders</span>
                  </div>
                  <div className="rounded-xl bg-(--color-background) p-2.5">
                    <span className="block text-base font-black text-(--color-text)">{favorites.length}</span>
                    <span className="text-[10px] font-semibold text-(--color-secondary-text) uppercase">Wishlist</span>
                  </div>
                  <div className="rounded-xl bg-(--color-background) p-2.5">
                    <span className="block text-base font-black text-(--color-text)">{addresses.length}</span>
                    <span className="text-[10px] font-semibold text-(--color-secondary-text) uppercase">Addresses</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-3 shadow-sm">
                <nav className="space-y-1">
                  {[
                    { id: "personal", label: "Personal Information", icon: FaUser },
                    { id: "orders", label: "My Orders", icon: FaBoxOpen, count: orders.length },
                    { id: "addresses", label: "Shipping Addresses", icon: FaMapMarkerAlt, count: addresses.length },
                    { id: "wishlist", label: "Saved Wishlist", icon: FaHeart, count: favorites.length },
                    { id: "security", label: "Account Security", icon: FaShieldAlt },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all cursor-pointer ${isActive
                          ? "bg-(--color-primary) text-(--color-surface) shadow-sm"
                          : "text-(--color-secondary-text) hover:bg-(--color-background) hover:text-(--color-text)"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={15} />
                          <span>{tab.label}</span>
                        </div>
                        {tab.count !== undefined && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${isActive ? "bg-white/20 text-white" : "bg-(--color-background) text-(--color-secondary-text)"
                            }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-3 border-t border-(--color-border) pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50 cursor-pointer"
                  >
                    <FaSignOutAlt size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="lg:col-span-8">
              {/* TAB 1: PERSONAL INFORMATION */}
              {activeTab === "personal" && (
                <div className="rounded-3xl border mb-6 border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm">
                  <div className="mb-6 flex items-center justify-between border-b border-(--color-border) pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-(--color-text)">General Information</h3>
                      <p className="text-xs text-(--color-secondary-text)">
                        Your profile details and primary contact information
                      </p>
                    </div>
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-(--color-border) bg-(--color-background) px-3.5 py-2 text-xs font-bold text-(--color-text) hover:border-(--color-primary) transition cursor-pointer"
                      >
                        <FaEdit size={12} /> Edit Details
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="text-xs font-bold text-(--color-secondary-text) hover:text-(--color-text) cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          Full Name
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">{userInfo?.name || "Not provided"}</p>
                      </div>

                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          Email Address
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">{userInfo?.email || "Not provided"}</p>
                      </div>

                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          Phone Number
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">{userInfo?.phone_number || "Not provided"}</p>
                      </div>

                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          Delivery Address
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">
                          {userInfo?.address || "Not provided"}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          City
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">{userInfo?.city || "Not provided"}</p>
                      </div>
                      <div className="rounded-2xl bg-(--color-background) p-4 border border-(--color-border)">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                          State
                        </span>
                        <p className="mt-1 text-sm font-bold text-(--color-text)">{userInfo?.state || "Not provided"}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={saveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={formData.phone || ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={formData.address || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.city || ""}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                            State / zip code
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="State"
                              value={formData.state || ""}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                            />

                            <input
                              type="text"
                              placeholder="Zip Code"
                              value={formData.zip_Code || ""}
                              onChange={(e) => setFormData({ ...formData, zip_Code: e.target.value })}
                              className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-(--color-border)">
                        <button
                          type="submit"
                          className="rounded-xl bg-(--color-primary) px-6 py-2.5 text-xs font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) cursor-pointer"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl border border-(--color-border) bg-(--color-background) px-5 py-2.5 text-xs font-semibold text-(--color-text) hover:bg-(--color-surface) cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: SHIPPING ADDRESSES */}
              {activeTab === "addresses" && (
                !isAddress ? (
                  <AddressCards
                    addresses={addresses}
                    setIsAddress={setIsAddress}
                    handleDeleteAddress={handleDeleteAddress}
                    handleSetDefaultAddress={handleSetDefaultAddress}
                  />
                ) : (
                  <AddAddressForm
                    addressForm={addressForm}
                    setAddressForm={setAddressForm}
                    handleAddAddress={handleAddAddress}
                    setIsAddress={setIsAddress}
                  />
                )
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
                    <h3 className="text-xl font-extrabold text-(--color-text)">Order History</h3>
                    <p className="text-xs text-(--color-secondary-text)">
                      Track your active shipments and view previous receipts
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-12 text-center shadow-sm">
                      <FaBoxOpen className="mx-auto h-12 w-12 text-(--color-secondary-text) opacity-40 mb-3" />
                      <h4 className="text-base font-bold text-(--color-text)">No orders yet</h4>
                      <p className="text-xs text-(--color-secondary-text) mt-1">
                        When you place orders, they will appear here.
                      </p>
                      <Link
                        to="/all-products"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-(--color-primary) px-5 py-2.5 text-xs font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark)"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const orderTotal = Number(order.total_amount ?? order.total ?? 0);
                      const orderDate = order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : order.date || "Recent";

                      const statusLower = (order.status || "").toLowerCase();
                      const statusColorClass =
                        statusLower === "completed" || statusLower === "delivered"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : statusLower === "cancelled"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200";

                      const orderItems = Array.isArray(order.items) ? order.items : [];

                      return (
                        <div
                          key={order.id}
                          className="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-sm"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) bg-(--color-background) p-4 sm:px-6">
                            <div className="flex items-center gap-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                                  Order Placed
                                </span>
                                <p className="text-xs font-bold text-(--color-text)">
                                  {orderDate}
                                </p>
                              </div>
                              <div className="h-6 w-px bg-(--color-border)" />
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-(--color-secondary-text)">
                                  Order #
                                </span>
                                <p className="text-xs font-mono font-bold text-(--color-text)">
                                  #{order.id}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold border ${statusColorClass}`}
                              >
                                {order.status || "Pending"}
                              </span>
                              <span className="text-sm font-extrabold text-(--color-text)">
                                ${orderTotal.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 sm:p-6 space-y-4">
                            {orderItems.map((item, idx) => {
                              const itemPrice = Number(item.price ?? 0);
                              return (
                                <div
                                  key={item.id ? `${order.id}-${item.id}-${idx}` : idx}
                                  className="flex items-center gap-4"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name || "Product"}
                                      className="h-16 w-16 rounded-xl object-cover border border-(--color-border)"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <h4 className="text-sm font-bold text-(--color-text)">
                                      {item.name || "Item"}
                                    </h4>
                                    <p className="text-xs text-(--color-secondary-text)">
                                      Quantity: {item.quantity || 1} × ${itemPrice.toFixed(2)}
                                    </p>
                                  </div>
                                  {item.id && (
                                    <Link
                                      to={`/product/${item.id}`}
                                      className="rounded-xl border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-xs font-bold text-(--color-text) hover:border-(--color-primary) transition"
                                    >
                                      Buy Again
                                    </Link>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-(--color-text)">Saved Wishlist</h3>
                      <p className="text-xs text-(--color-secondary-text)">
                        {favorites.length} products saved for later
                      </p>
                    </div>
                    <Link
                      to="/favorites"
                      className="text-xs font-bold text-(--color-primary) hover:underline flex items-center gap-1"
                    >
                      View All in Wishlist <FaArrowRight size={10} />
                    </Link>
                  </div>

                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {favorites.slice(0, 4).map((item) => (
                        <div key={item.id} className="flex gap-4 rounded-2xl border border-(--color-border) bg-(--color-background) p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-xl object-cover border border-(--color-border)"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-(--color-text) line-clamp-1">{item.name}</h4>
                              <p className="text-xs font-extrabold text-(--color-text) mt-1">
                                ${(Number(item.price) || 0).toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => addToCart(item)}
                                className="flex-1 rounded-lg bg-(--color-primary) py-1.5 text-[11px] font-bold text-(--color-surface) hover:bg-(--color-primary-dark) transition"
                              >
                                Add to Cart
                              </button>
                              <button
                                type="button"
                                onClick={() => removeFromFavorites(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Remove"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <FaHeart size={36} className="mx-auto text-(--color-border)" />
                      <p className="mt-3 text-sm font-bold text-(--color-text)">Your wishlist is empty</p>
                      <Link
                        to="/home"
                        className="mt-4 inline-block rounded-xl bg-(--color-primary) px-6 py-2.5 text-xs font-bold text-(--color-surface)"
                      >
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SECURITY */}
              {activeTab === "security" && (
                <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-(--color-border) pb-4">
                    <h3 className="text-xl font-extrabold text-(--color-text)">Account Security</h3>
                    <p className="text-xs text-(--color-secondary-text)">
                      Update your password and secure your authentication credentials
                    </p>
                  </div>

                  {passwordMsg && (
                    <div className="rounded-xl bg-green-50 p-3 text-xs font-bold text-green-700 border border-green-200">
                      {passwordMsg}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordState.currentPassword}
                        onChange={(e) => setPasswordState({ ...passwordState, currentPassword: e.target.value })}
                        className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordState.newPassword}
                        onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
                        className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordState.confirmPassword}
                        onChange={(e) => setPasswordState({ ...passwordState, confirmPassword: e.target.value })}
                        className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="rounded-xl bg-(--color-primary) px-6 py-3 text-xs font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
