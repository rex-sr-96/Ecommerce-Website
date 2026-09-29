import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTruck,
  FaUndoAlt,
  FaLock,
  FaHeadset,
  FaArrowUp,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-(--color-primary) text-slate-100 border-t border-(--color-border)">
      {/* 1. Value Proposition Features Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800/80">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-contrast) border border-(--color-contrast)/20">
              <FaTruck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Worldwide Delivery</h4>
              <p className="text-xs text-slate-400">On all orders over ₹75</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800/80">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-contrast) border border-(--color-contrast)/20">
              <FaUndoAlt size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Free Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free size exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800/80">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-contrast) border border-(--color-contrast)/20">
              <FaLock size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Encrypted Checkout</h4>
              <p className="text-xs text-slate-400">Secured SSL payment gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800/80">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-(--color-contrast)/10 text-(--color-contrast) border border-(--color-contrast)/20">
              <FaHeadset size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400">Live chat & phone helpline</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Links & Brand Info */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Info Column */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 text-xl font-bold text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-contrast) text-(--color-primary-dark) font-black">
                K
              </span>
              <span className="text-lg font-black uppercase tracking-[0.2em]">KickZone Shoes</span>
            </Link>

            <p className="max-w-sm text-sm text-slate-300 leading-relaxed">
              Your destination for authentic, high-performance athletic footwear, everyday sneakers, formal leather shoes, and exclusive limited edition drops.
            </p>

            {/* Social Media Pills */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-(--color-contrast) hover:text-slate-950"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-(--color-contrast) hover:text-slate-950"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-(--color-contrast) hover:text-slate-950"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-(--color-contrast) hover:text-slate-950"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {/* Shop Departments */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-contrast)">
                Shop Departments
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link to="/home" className="transition hover:text-(--color-contrast)">
                    New & Featured
                  </Link>
                </li>
                <li>
                  <Link to="/mens" className="transition hover:text-(--color-contrast)">
                    Men's Shoes
                  </Link>
                </li>
                <li>
                  <Link to="/women" className="transition hover:text-(--color-contrast)">
                    Women's Shoes
                  </Link>
                </li>
                <li>
                  <Link to="/kids" className="transition hover:text-(--color-contrast)">
                    Kids' Shoes
                  </Link>
                </li>
                <li>
                  <Link to="/sports" className="transition hover:text-(--color-contrast)">
                    Sports Shoes
                  </Link>
                </li>
                <li>
                  <Link to="/sale" className="inline-flex items-center gap-1.5 transition text-rose-400 font-bold hover:text-rose-300">
                    <span>Sale & Outlet</span>
                    <span className="rounded bg-rose-600/30 text-rose-300 text-[10px] px-1.5 py-0.5">HOT</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-contrast)">
                Customer Care
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link to="/track" className="transition hover:text-(--color-contrast)">
                    <span>Track Your Order</span>
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="transition hover:text-(--color-contrast)">
                    <span> Shipping Rates & Policies</span>
                  </Link>
                </li>
                <li>
                  <Link to="/return" className="transition hover:text-(--color-contrast)">
                    <span>Returns & Exchanges</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="transition hover:text-(--color-contrast)">
                    <span>  Help Center / FAQs</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Corporate & Legal */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-contrast)">
                Company Info
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link to="/about">
                    About KickZone</Link>
                </li>
                <li>
                  <Link to="/privacy&policy">
                    Privacy & Policy</Link>
                </li>
                <li>
                  <Link to="/terms&conditon">
                    Terms and Conditon</Link>
                </li>
                <li>
                  <Link to="/cookies">
                    Cookie Setting</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar with Payment Icons & Back To Top */}
      <div className="border-t border-slate-800 bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 KickZone Shoes Inc. All rights reserved.</p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-4 text-2xl text-slate-400">
            <FaCcVisa className="hover:text-white transition-colors" title="Visa" />
            <FaCcMastercard className="hover:text-white transition-colors" title="Mastercard" />
            <FaCcPaypal className="hover:text-white transition-colors" title="PayPal" />
            <FaApplePay className="hover:text-white transition-colors" title="Apple Pay" />
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-(--color-contrast) hover:text-slate-950"
          >
            <span>Back to Top</span>
            <FaArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;