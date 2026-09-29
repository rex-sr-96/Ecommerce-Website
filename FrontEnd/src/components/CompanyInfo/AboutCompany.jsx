import { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-(--color-background) text-(--color-text)">
                {/* Hero */}
                <section className="border-b border-(--color-border)">
                    <div className="mx-auto max-w-6xl px-6 py-16 text-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-(--color-primary)">
                            Welcome to KickZone
                        </p>

                        <h1 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">
                            Step Into Your Style
                        </h1>

                        <p className="mx-auto max-w-2xl text-base leading-7 text-(--color-text-muted)">
                            KickZone is your destination for stylish, comfortable, and
                            reliable footwear. We bring together a wide range of shoes
                            designed to fit your everyday lifestyle, from casual walks to
                            active days.
                        </p>
                    </div>
                </section>

                {/* About KickZone */}
                <section>
                    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
                        <div>
                            <h2 className="mb-5 text-3xl font-bold">
                                About KickZone
                            </h2>

                            <p className="mb-4 leading-7 text-(--color-text-muted)">
                                KickZone is an online footwear store created for people who
                                believe that the right pair of shoes can complete any look.
                                Our goal is to make finding and purchasing your favorite
                                footwear simple, convenient, and enjoyable.
                            </p>

                            <p className="leading-7 text-(--color-text-muted)">
                                From everyday sneakers and casual shoes to sports and
                                lifestyle footwear, KickZone offers products for different
                                tastes, occasions, and lifestyles.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-8">
                            <h3 className="mb-4 text-xl font-bold">
                                Why KickZone?
                            </h3>

                            <ul className="space-y-4 text-sm text-(--color-text-muted)">
                                <li>
                                    ✓ Carefully selected footwear collections
                                </li>

                                <li>
                                    ✓ Simple and convenient online shopping
                                </li>

                                <li>
                                    ✓ Secure and reliable checkout
                                </li>

                                <li>
                                    ✓ Easy order tracking
                                </li>

                                <li>
                                    ✓ Customer-focused shopping experience
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="border-y border-(--color-border) bg-(--color-surface)">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
                        <h2 className="mb-5 text-3xl font-bold">
                            Our Mission
                        </h2>

                        <p className="leading-8 text-(--color-text-muted)">
                            Our mission is to make quality footwear accessible through a
                            smooth and enjoyable online shopping experience. KickZone aims
                            to combine style, comfort, convenience, and customer service
                            in one place.
                        </p>
                    </div>
                </section>

                {/* What We Offer */}
                <section>
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mb-10 text-center">
                            <h2 className="mb-3 text-3xl font-bold">
                                What You Can Find at KickZone
                            </h2>

                            <p className="text-(--color-text-muted)">
                                Find the right footwear for every part of your day.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-(--color-border) p-6">
                                <h3 className="mb-2 font-bold">
                                    Everyday Sneakers
                                </h3>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    Comfortable and versatile shoes for everyday activities.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-(--color-border) p-6">
                                <h3 className="mb-2 font-bold">
                                    Sports Footwear
                                </h3>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    Footwear designed for active lifestyles and movement.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-(--color-border) p-6">
                                <h3 className="mb-2 font-bold">
                                    Casual Shoes
                                </h3>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    Stylish options that fit casual and relaxed occasions.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-(--color-border) p-6">
                                <h3 className="mb-2 font-bold">
                                    Lifestyle Collection
                                </h3>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    Modern footwear for expressing your personal style.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <section className="border-t border-(--color-border)">
                    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold">
                            Find Your Next Pair
                        </h2>

                        <p className="mb-6 leading-7 text-(--color-text-muted)">
                            Whether you're looking for everyday comfort, a sporty
                            companion, or a fresh addition to your collection, KickZone
                            is here to help you find your next favorite pair.
                        </p>

                        <p className="font-bold">
                            KickZone — Step In. Stand Out.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default About;