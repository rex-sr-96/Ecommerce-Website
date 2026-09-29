import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaHeart,
    FaShoppingCart,
    FaUser,
    FaSignOutAlt,
    FaBoxOpen,
    FaUserCircle,
    FaChevronDown
} from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { favorites } = useFavorites();
    const { cartItemsCount } = useCart();
    const { user, logout } = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu and dropdown on route change
    useEffect(() => {
        setIsOpen(false);
        setIsDropdownOpen(false);
    }, [location.pathname]);

    // Helper: returns true when this link matches the current path
    const isActive = (path) => {
        if (path === "/" || path === "/home") {
            return location.pathname === "/" || location.pathname === "/home";
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setIsOpen(false);
        navigate("/login");
    };

    // Extract first letter of name or email
    const firstLetter = user
        ? ((user.name || user.email || "U").trim().charAt(0).toUpperCase())
        : "";

    return (
        <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-(--color-primary) transition hover:opacity-85">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-primary-dark) font-black text-xl ring-1 ring-(--color-primary)/20 shadow-sm">
                        K
                    </span>
                    <span className="text-base font-extrabold uppercase tracking-[0.18em]">KickZone</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden items-center gap-6 text-sm font-medium text-(--color-primary) md:flex">
                    {[
                        { to: "/home", label: "New & Featured" },
                        { to: "/mens", label: "Men" },
                        { to: "/women", label: "Women" },
                        { to: "/kids", label: "Kids" },
                        { to: "/sports", label: "Sports" },
                        { to: "/sale", label: "Sale" },
                    ].map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`relative py-1 transition hover:text-(--color-contrast) ${isActive(link.to)
                                ? "text-(--color-contrast) font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-(--color-contrast)"
                                : ""
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Action Icons */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        to="/search"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) text-(--color-text) transition hover:border-(--color-primary) hover:text-(--color-primary-dark) shadow-sm"
                        title="Search"
                    >
                        <FaSearch size={17} />
                    </Link>

                    <Link
                        to="/favorites"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) text-(--color-text) transition hover:border-(--color-primary) hover:text-(--color-primary-dark) shadow-sm"
                        title="Wishlist"
                    >
                        <FaHeart size={17} />
                        {favorites.length > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-(--color-surface)">
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-primary) text-(--color-surface) transition hover:bg-(--color-primary-dark) shadow-sm"
                        title="Cart"
                    >
                        <FaShoppingCart size={17} />
                        {cartItemsCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-(--color-contrast) text-[10px] font-bold text-(--color-primary-dark) shadow-sm ring-2 ring-(--color-surface)">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>

                    {/* Authentication / Profile Avatar */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-(--color-contrast)/40 bg-(--color-surface) pl-1.5 pr-3 py-1 text-sm font-bold text-(--color-text) transition hover:border-(--color-contrast) shadow-sm cursor-pointer"
                                aria-expanded={isDropdownOpen}
                                title={user.name || user.email}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-extrabold text-sm shadow-xs ring-1 ring-amber-300">
                                    {firstLetter}
                                </span>

                                <FaChevronDown size={10} className={`text-(--color-secondary-text) transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* User Profile Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-(--color-border) bg-(--color-surface) p-2 shadow-2xl ring-1 ring-black/5 z-50 animate-in fade-in duration-150">
                                    <div className="border-b border-(--color-border) p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-extrabold text-base shadow-xs">
                                                {firstLetter}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="truncate text-sm font-bold text-(--color-text)">
                                                    {user.name || "Valued Shopper"}
                                                </p>
                                                <p className="truncate text-xs text-(--color-secondary-text)">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-1">
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-(--color-text) transition hover:bg-(--color-background) hover:text-(--color-primary)"
                                        >
                                            <FaUserCircle className="text-(--color-secondary-text)" size={15} />
                                            <span>My Profile & Info</span>
                                        </Link>

                                        <Link
                                            to="/profile?tab=orders"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-(--color-text) transition hover:bg-(--color-background) hover:text-(--color-primary)"
                                        >
                                            <FaBoxOpen className="text-(--color-secondary-text)" size={15} />
                                            <span>My Orders</span>
                                        </Link>

                                        <Link
                                            to="/favorites"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-(--color-text) transition hover:bg-(--color-background) hover:text-(--color-primary)"
                                        >
                                            <FaHeart className="text-(--color-secondary-text)" size={15} />
                                            <span>Saved Wishlist ({favorites.length})</span>
                                        </Link>
                                    </div>

                                    <div className="border-t border-(--color-border) pt-1 mt-1">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50 cursor-pointer"
                                        >
                                            <FaSignOutAlt size={15} />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-primary) text-(--color-surface) transition hover:bg-(--color-primary-dark) shadow-sm"
                            title="Sign In / Register"
                        >
                            <FaUser size={17} />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Hamburger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-background) text-(--color-text) transition hover:border-(--color-primary) hover:text-(--color-primary-dark) md:hidden shadow-sm"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="md:hidden border-t border-(--color-border) bg-(--color-surface) px-4 pb-6 pt-4 space-y-4">
                    {/* User status card in mobile */}
                    {user ? (
                        <div className="rounded-2xl border border-(--color-border) bg-(--color-background) p-3.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-extrabold text-base shadow-xs">
                                        {firstLetter}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm text-(--color-text)">{user.name || "Customer"}</p>
                                        <p className="text-xs text-(--color-secondary-text) truncate">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                                    title="Log Out"
                                >
                                    <FaSignOutAlt size={16} />
                                </button>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-(--color-border)/60">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl bg-(--color-surface) py-2 px-3 text-center text-xs font-bold text-(--color-text) border border-(--color-border)"
                                >
                                    My Profile
                                </Link>
                                <Link
                                    to="/profile?tab=orders"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl bg-(--color-surface) py-2 px-3 text-center text-xs font-bold text-(--color-text) border border-(--color-border)"
                                >
                                    My Orders
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-(--color-primary) py-3 text-sm font-bold text-(--color-surface) shadow-sm"
                        >
                            <FaUser size={14} />
                            <span>Sign In / Create Account</span>
                        </Link>
                    )}

                    {/* Navigation Category Links */}
                    <div className="flex flex-col gap-1 text-sm font-medium text-(--color-secondary-text)">
                        {[
                            { to: "/home", label: "New & Featured" },
                            { to: "/mens", label: "Men" },
                            { to: "/women", label: "Women" },
                            { to: "/kids", label: "Kids" },
                            { to: "/sports", label: "Sports" },
                            { to: "/sale", label: "Sale" },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`rounded-xl px-3 py-2.5 transition hover:bg-(--color-background) hover:text-(--color-primary-dark) ${isActive(link.to)
                                    ? "bg-(--color-background) text-(--color-contrast) font-bold"
                                    : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-3 pt-2 border-t border-(--color-border)">
                        <Link
                            to="/search"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-(--color-border) bg-(--color-background) text-(--color-text) font-semibold text-xs"
                        >
                            <FaSearch size={14} /> Search
                        </Link>
                        <Link
                            to="/favorites"
                            onClick={() => setIsOpen(false)}
                            className="relative flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-(--color-border) bg-(--color-background) text-(--color-text) font-semibold text-xs"
                        >
                            <FaHeart size={14} /> Saved ({favorites.length})
                        </Link>
                        <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="relative flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-(--color-primary) text-(--color-surface) font-semibold text-xs"
                        >
                            <FaShoppingCart size={14} /> Cart ({cartItemsCount})
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
