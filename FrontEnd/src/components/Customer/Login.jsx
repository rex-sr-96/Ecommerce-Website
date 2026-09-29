import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaShoppingBag
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  // Sync isLogin with route if navigated to /signup
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email: email.trim(), password }
        : { name: name.trim(), email: email.trim(), password };

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please check your credentials.");
      }

      // Update global AuthContext state
      login(data.user, data.token);

      setSuccessMsg(isLogin ? `Welcome back, ${data.user.name || 'Shopper'}!` : "Account created successfully! Welcome to KickZone.");

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (err) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setIsLogin(true);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-(--color-background) px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header Link */}
      <div className="mx-auto w-full max-w-md">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-secondary-text) hover:text-(--color-text) transition-colors"
        >
          <FaArrowLeft size={12} /> Back to Store
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-xl shadow-black/5">
        {/* Brand Header */}
        <div className="border-b border-(--color-border) bg-(--color-background)/50 px-8 pt-8 pb-6 text-center">
          <Link to="/home" className="inline-flex items-center gap-2 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-primary-dark) font-black text-lg ring-1 ring-(--color-primary)/20">
              K
            </span>
            <span className="text-lg font-bold tracking-wider uppercase text-(--color-primary)">
              KickZone
            </span>
          </Link>
          <h2 className="text-2xl font-black tracking-tight text-(--color-text)">
            {isLogin ? "Welcome Back" : "Join KickZone"}
          </h2>
          <p className="mt-1 text-xs text-(--color-secondary-text)">
            {isLogin
              ? "Sign in to access your orders, wishlist, and exclusive drops"
              : "Create an account to unlock tailored recommendations and track orders"}
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-6 flex rounded-2xl bg-(--color-surface) p-1 border border-(--color-border)">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccessMsg("");
              }}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${isLogin
                ? "bg-(--color-primary) text-(--color-surface) shadow-sm"
                : "text-(--color-secondary-text) hover:text-(--color-text)"
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccessMsg("");
              }}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${!isLogin
                ? "bg-(--color-primary) text-(--color-surface) shadow-sm"
                : "text-(--color-secondary-text) hover:text-(--color-text)"
                }`}
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
              <FaExclamationCircle className="shrink-0 text-red-500" size={15} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-green-50 p-3.5 text-xs font-semibold text-green-700 border border-green-200">
              <FaCheckCircle className="shrink-0 text-green-500" size={15} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-secondary-text)" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-(--color-border) bg-(--color-background) py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-(--color-primary) focus:bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/10"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-secondary-text)" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-(--color-border) bg-(--color-background) py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-(--color-primary) focus:bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/10"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                  Password *
                </label>
                {isLogin && (
                  <span className="text-xs font-medium text-(--color-secondary-text) hover:text-(--color-primary) cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-secondary-text)" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-(--color-border) bg-(--color-background) py-3 pl-11 pr-11 text-sm font-medium transition-all focus:border-(--color-primary) focus:bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/10"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--color-secondary-text) hover:text-(--color-text)"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-(--color-primary) py-3.5 text-sm font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) disabled:opacity-60 shadow-md cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : isLogin ? (
                <>
                  <FaShoppingBag size={14} />
                  <span>Sign In to Account</span>
                </>
              ) : (
                <>
                  <FaShieldAlt size={14} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="border-t border-(--color-border) bg-(--color-background) p-5 text-center">
          <p className="text-xs text-(--color-secondary-text)">
            {isLogin ? "Don't have an account yet? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccessMsg("");
              }}
              className="font-bold text-(--color-primary) hover:underline cursor-pointer ml-1"
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-(--color-secondary-text) mt-4">
        © {new Date().getFullYear()} KickZone E-Commerce. Secure 256-bit SSL encrypted.
      </div>
    </div>
  );
};

export default Login;


