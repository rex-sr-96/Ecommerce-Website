import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const ReturnsExchanges = () => {
    return (
        <section id="returns" className="py-10">
            <Navbar />
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <h2 className="text-2xl font-black text-(--color-text)">
                    Returns & Exchanges
                </h2>

                <div className="mt-6 space-y-5 text-sm text-(--color-secondary-text)">
                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Return Period
                        </h3>
                        <p className="mt-1">
                            Eligible products can be returned within the return period
                            specified for your order.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Product Condition
                        </h3>
                        <p className="mt-1">
                            Products should be unused and returned in their original
                            packaging.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Exchange
                        </h3>
                        <p className="mt-1">
                            Size exchanges may be available depending on product
                            availability.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Refund
                        </h3>
                        <p className="mt-1">
                            Approved refunds are processed according to your payment method
                            and store policy.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ReturnsExchanges;