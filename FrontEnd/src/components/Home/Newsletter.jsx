import React, { useState } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-(--color-contrast) py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-(--color-primary) p-8 sm:p-12 text-center shadow-2xl text-white border border-(--color-primary-dark)">
        <span className="inline-block rounded-full bg-(--color-contrast)/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-(--color-contrast) border border-(--color-contrast)/30">
          Stay Ahead of the Curve
        </span>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
          Get 15% Off Your First Order
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
          Subscribe to our newsletter for secret discounts, early access to limited edition shoe drops, and style guides.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-(--color-success)/20 border border-(--color-success) p-4 text-(--color-success) font-semibold max-w-md mx-auto">
            <FaCheckCircle size={20} />
            <span>Thank you for subscribing! Check your inbox for your 15% discount code.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 mx-auto flex max-w-md flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 py-3.5 text-sm text-(--color-text) placeholder-(--color-secondary-text) focus:border-(--color-contrast) focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--color-contrast) px-6 py-3.5 text-sm font-bold text-(--color-primary-dark) transition hover:bg-amber-300 active:scale-95"
            >
              <span>Subscribe</span>
              <FaPaperPlane size={14} />
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-slate-400">
          We respect your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
