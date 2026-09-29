import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const ShoeSizeGuide = () => {
    const sizes = [
        { us: "6", uk: "5", eu: "38", cm: "24" },
        { us: "7", uk: "6", eu: "39", cm: "25" },
        { us: "8", uk: "7", eu: "41", cm: "26" },
        { us: "9", uk: "8", eu: "42", cm: "27" },
        { us: "10", uk: "9", eu: "43", cm: "28" },
        { us: "11", uk: "10", eu: "45", cm: "29" },
        { us: "12", uk: "11", eu: "46", cm: "30" },
    ];

    return (
        <section id="size-guide" className="py-10">
            <Navbar />
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8">
                <h2 className="text-2xl font-black text-(--color-text)">
                    Shoe Size Guide
                </h2>

                <p className="mt-2 text-sm text-(--color-secondary-text)">
                    Use the chart below as a general reference when selecting your shoe
                    size.
                </p>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[500px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-(--color-border)">
                                <th className="p-3 text-left">US</th>
                                <th className="p-3 text-left">UK</th>
                                <th className="p-3 text-left">EU</th>
                                <th className="p-3 text-left">Foot Length (cm)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sizes.map((size) => (
                                <tr
                                    key={size.us}
                                    className="border-b border-(--color-border)"
                                >
                                    <td className="p-3 font-semibold">{size.us}</td>
                                    <td className="p-3">{size.uk}</td>
                                    <td className="p-3">{size.eu}</td>
                                    <td className="p-3">{size.cm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ShoeSizeGuide;