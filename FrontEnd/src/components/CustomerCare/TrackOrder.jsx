import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");

    const handleTrack = (e) => {
        e.preventDefault();

        if (!orderId.trim()) {
            alert("Please enter your order ID");
            return;
        }

        console.log("Tracking order:", orderId);
    };

    return (
        <section id="track-order" className="py-10">
            <Navbar />
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <h2 className="text-2xl font-black text-(--color-text)">
                    Track Your Order
                </h2>

                <p className="mt-2 text-sm text-(--color-secondary-text)">
                    Enter your order ID to check the current status of your order.
                </p>

                <form onSubmit={handleTrack} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        className="flex-1 rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm outline-none"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-(--color-primary) px-6 py-3 text-sm font-bold text-(--color-surface)"
                    >
                        Track Order
                    </button>
                </form>
            </div>
            <Footer />
        </section>
    );
};

export default TrackOrder;