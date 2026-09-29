import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How can I track my order?",
            answer:
                "You can track your order using the order ID provided after placing your order.",
        },
        {
            question: "How long does delivery take?",
            answer:
                "Delivery time depends on your location and the shipping method selected during checkout.",
        },
        {
            question: "Can I return a product?",
            answer:
                "Eligible products can be returned according to the store's return policy.",
        },
        {
            question: "Can I exchange my shoe size?",
            answer:
                "Size exchanges may be available depending on product availability and the applicable exchange policy.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can contact customer support through the support options provided on the website.",
        },
    ];

    return (
        <section id="faqs" className="py-10">
            <Navbar />
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <h2 className="text-2xl font-black text-(--color-text)">
                    Help Center / FAQs
                </h2>

                <div className="mt-6 space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="rounded-2xl border border-(--color-border) bg-(--color-background)"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-(--color-text)"
                                >
                                    <span>{faq.question}</span>

                                    <span className="text-lg">
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-(--color-border) px-4 py-4 text-sm text-(--color-secondary-text)">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default FAQs;