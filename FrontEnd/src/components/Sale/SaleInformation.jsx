import React from "react";
import SectionHeader from "../Common/SectionHeader";
import { FaTruck, FaUndoAlt, FaShieldAlt } from "react-icons/fa";

const SaleInformation = () => {
  return (
    <section className="bg-slate-900 py-16 text-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Customer Peace of Mind"
          title="Sale Information"
          subtitle="Everything you need to know regarding shipping speeds and our hassle-free return policy during sale events."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Shipping Info */}
          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-8 shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-bold text-xl">
              <FaTruck />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Shipping Information</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Free Standard Shipping</strong> on all orders over $75.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Express 2-Day Delivery</strong> available at checkout for $9.99.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>All orders dispatched within 24 hours with real-time GPS tracking.</span>
              </li>
            </ul>
          </div>

          {/* Return Policy */}
          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-8 shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white font-bold text-xl">
              <FaUndoAlt />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Return & Exchange Policy</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>30-Day Money-Back Guarantee</strong> on all sale items.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>Pre-paid return shipping label included in every shoebox.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>Hassle-free size exchange online or at any official partner store.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleInformation;
