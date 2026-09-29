import { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-(--color-background) text-(--color-text)">
                <div className="mx-auto max-w-5xl px-6 py-12">
                    <h1 className="mb-4 text-3xl font-bold">
                        Terms & Conditions
                    </h1>

                    <p className="mb-8 text-sm text-(--color-text-muted)">
                        Last updated: August 24, 2026
                    </p>

                    <section className="space-y-8">
                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                1. Introduction
                            </h2>
                            <p className="leading-7">
                                Welcome to our website. By accessing or using this
                                website, you agree to comply with these Terms &
                                Conditions. Please read them carefully before using
                                our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                2. Use of Our Website
                            </h2>
                            <p className="leading-7">
                                You agree to use this website only for lawful
                                purposes and in a way that does not interfere with
                                the operation or security of the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                3. Products and Pricing
                            </h2>
                            <p className="leading-7">
                                We make reasonable efforts to ensure that product
                                descriptions, images, availability, and prices are
                                accurate. However, errors may occasionally occur.
                                We reserve the right to correct errors and update
                                product information when necessary.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                4. Orders
                            </h2>
                            <p className="leading-7">
                                When you place an order, you agree to provide
                                accurate and complete information. We reserve the
                                right to cancel or refuse an order where necessary,
                                including in cases of incorrect pricing, product
                                availability, or suspected fraudulent activity.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                5. Payments
                            </h2>
                            <p className="leading-7">
                                Payments are processed through our supported payment
                                providers. You agree to provide valid payment
                                information and authorize the applicable payment
                                amount when placing an order.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                6. Shipping and Delivery
                            </h2>
                            <p className="leading-7">
                                Delivery times may vary depending on the shipping
                                location, availability, and selected shipping
                                method. We will make reasonable efforts to deliver
                                orders within the estimated delivery period.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                7. Returns and Refunds
                            </h2>
                            <p className="leading-7">
                                Returns, exchanges, and refunds are subject to our
                                applicable return and refund policies. Products may
                                need to meet specific eligibility requirements.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                8. Intellectual Property
                            </h2>
                            <p className="leading-7">
                                Website content, including text, graphics, logos,
                                images, and other materials, may be protected by
                                applicable intellectual property laws and may not be
                                copied or reused without appropriate permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                9. Account Responsibility
                            </h2>
                            <p className="leading-7">
                                If you create an account, you are responsible for
                                maintaining the confidentiality of your account
                                information and for activity performed through your
                                account.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                10. Changes to These Terms
                            </h2>
                            <p className="leading-7">
                                We may update these Terms & Conditions from time to
                                time. Updated terms will be published on this page
                                with the revised date.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold">
                                11. Contact Us
                            </h2>
                            <p className="leading-7">
                                If you have questions about these Terms &
                                Conditions, please contact our support team.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default TermsAndConditions;