import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="min-h-screen flex flex-col bg-(--color-background)">
            <Navbar />

            <main className="flex-1">
                <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-(--color-text)">
                            Privacy Policy
                        </h1>

                        <p className="mt-3 text-sm text-(--color-secondary-text)">
                            Last Updated: August 24, 2026
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="space-y-8 text-(--color-text)">

                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                1. Introduction
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                Welcome to [Your Store Name]. We respect your privacy
                                and are committed to protecting the personal information
                                you provide when using our website, purchasing our
                                products, or contacting us.
                            </p>

                            <p className="mt-3 leading-7 text-(--color-secondary-text)">
                                This Privacy Policy explains what information we collect,
                                how we use it, how we protect it, and your choices
                                regarding your information.
                            </p>
                        </section>

                        {/* Information Collection */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                2. Information We Collect
                            </h2>

                            <p className="mb-3 text-(--color-secondary-text)">
                                We may collect the following information when you use
                                our website:
                            </p>

                            <ul className="list-disc space-y-2 pl-6 text-(--color-secondary-text)">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Billing address</li>
                                <li>Shipping address</li>
                                <li>City, State and Pincode</li>
                                <li>Account information</li>
                                <li>Order history</li>
                                <li>Product and cart information</li>
                            </ul>
                        </section>

                        {/* Account Information */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                3. Account Information
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                If you create an account, we may store your name,
                                email address, phone number, saved addresses, and
                                order history.
                            </p>

                            <p className="mt-3 leading-7 text-(--color-secondary-text)">
                                Passwords are stored using secure password-hashing
                                methods and are not stored as plain text.
                            </p>
                        </section>

                        {/* Order Information */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                4. Order Information
                            </h2>

                            <p className="mb-3 text-(--color-secondary-text)">
                                When you place an order, we may collect:
                            </p>

                            <ul className="list-disc space-y-2 pl-6 text-(--color-secondary-text)">
                                <li>Order ID</li>
                                <li>Products purchased</li>
                                <li>Product quantity</li>
                                <li>Product size</li>
                                <li>Product price</li>
                                <li>Shipping information</li>
                                <li>Payment status</li>
                                <li>Delivery information</li>
                            </ul>
                        </section>

                        {/* Payment */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                5. Payment Information
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                Online payments may be processed through third-party
                                payment providers such as Razorpay. Payment information
                                is processed through the payment provider's secure
                                payment infrastructure.
                            </p>

                            <p className="mt-3 leading-7 text-(--color-secondary-text)">
                                We do not intentionally store complete card numbers,
                                CVV numbers, UPI PINs, or banking passwords on our
                                own application servers.
                            </p>
                        </section>

                        {/* How Information Is Used */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                6. How We Use Your Information
                            </h2>

                            <ul className="list-disc space-y-2 pl-6 text-(--color-secondary-text)">
                                <li>To create and manage your account</li>
                                <li>To process orders</li>
                                <li>To process payments</li>
                                <li>To deliver products</li>
                                <li>To provide order tracking</li>
                                <li>To process returns and refunds</li>
                                <li>To provide customer support</li>
                                <li>To improve our website</li>
                                <li>To prevent fraud</li>
                                <li>To maintain website security</li>
                            </ul>
                        </section>

                        {/* Cookies */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                7. Cookies and Local Storage
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                Our website may use cookies, local storage, and similar
                                technologies to maintain login sessions, remember
                                shopping cart information, store preferences, and
                                improve the website experience.
                            </p>
                        </section>

                        {/* Sharing */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                8. Sharing of Information
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                We do not sell your personal information. We may share
                                necessary information with trusted service providers
                                such as payment providers, delivery partners, hosting
                                providers, email services, and fraud-prevention services.
                            </p>
                        </section>

                        {/* Security */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                9. Data Security
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                We use reasonable technical and organizational measures
                                to protect your personal information, including secure
                                authentication, password hashing, access controls,
                                database security, and HTTPS where available.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                10. Data Retention
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                We retain personal information for as long as reasonably
                                necessary to provide our services, process orders,
                                handle returns and refunds, maintain transaction records,
                                comply with applicable requirements, and resolve disputes.
                            </p>
                        </section>

                        {/* User Rights */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                11. Your Rights
                            </h2>

                            <p className="mb-3 text-(--color-secondary-text)">
                                Depending on applicable law, you may request to:
                            </p>

                            <ul className="list-disc space-y-2 pl-6 text-(--color-secondary-text)">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Update your account information</li>
                                <li>Update your saved addresses</li>
                                <li>Request deletion of your account</li>
                                <li>Withdraw optional marketing communications</li>
                            </ul>
                        </section>

                        {/* Third Party */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                12. Third-Party Services
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                Our website may use third-party services for payment
                                processing, hosting, databases, analytics, email,
                                delivery, and other services. These providers may
                                process information according to their own privacy
                                policies and terms.
                            </p>
                        </section>

                        {/* Policy Updates */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                13. Changes to This Privacy Policy
                            </h2>

                            <p className="leading-7 text-(--color-secondary-text)">
                                We may update this Privacy Policy from time to time.
                                When changes are made, the Last Updated date will be
                                updated on this page.
                            </p>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold">
                                14. Contact Us
                            </h2>

                            <div className="rounded-2xl bg-(--color-surface) p-6 ring-1 ring-(--color-border)">
                                <p className="font-semibold">
                                    [Your Store Name]
                                </p>

                                <p className="mt-2 text-(--color-secondary-text)">
                                    Email: support@example.com
                                </p>

                                <p className="mt-1 text-(--color-secondary-text)">
                                    Phone: +91 XXXXX XXXXX
                                </p>

                                <p className="mt-1 text-(--color-secondary-text)">
                                    Address: [Your Business Address]
                                </p>
                            </div>
                        </section>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;