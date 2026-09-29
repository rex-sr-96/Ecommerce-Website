import { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import { fetchTestimonials } from "../../services/api";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const CustomerReviews = ({
  title = "Customer Reviews",
  subtitle = "Real reviews from verified shoppers who love our shoes.",
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(setReviews)
      .catch((err) => console.error("Failed to fetch testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Verified Experience"
          title={title}
          subtitle={subtitle}
        />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((rev) => (
              <div
                key={rev.id || rev.name}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-amber-400 mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                    <FaQuoteLeft size={20} className="text-slate-200" />
                  </div>

                  <p className="text-sm italic text-slate-700 leading-relaxed mb-4">
                    "{rev.comment || rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={
                      rev.avatar ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    }
                    alt={rev.name}
                    className="h-10 w-10 rounded-full object-cover border border-amber-400"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                    <span className="text-[11px] font-semibold text-emerald-600">
                      ✓ {rev.role || "Verified Buyer"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-400">
            No reviews available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;