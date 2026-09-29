import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const ShippingPolicies = () => {
    return (
        <section id="shipping" className="py-10">
            <Navbar />
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <h2 className="text-2xl font-black text-(--color-text)">
                    Shipping Rates & Policies
                </h2>

                <div className="mt-6 space-y-5 text-sm text-(--color-secondary-text)">
                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Standard Shipping
                        </h3>
                        <p className="mt-1">
                            Standard delivery usually takes 3–7 business days.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Express Shipping
                        </h3>
                        <p className="mt-1">
                            Express delivery is available for selected locations.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-(--color-text)">
                            Shipping Charges
                        </h3>
                        <p className="mt-1">
                            Shipping charges are calculated during checkout based on your
                            delivery location and order.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ShippingPolicies; 