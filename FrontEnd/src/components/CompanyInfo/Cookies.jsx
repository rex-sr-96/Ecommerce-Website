import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CookieSettings = () => {
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (type) => {
        if (type === "necessary") return;

        setPreferences((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleSave = () => {
        localStorage.setItem(
            "kickzoneCookiePreferences",
            JSON.stringify(preferences)
        );

        alert("Cookie preferences saved successfully.");
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-(--color-background) text-(--color-text)">
                <div className="mx-auto max-w-4xl px-6 py-14">

                    {/* Header */}
                    <div className="mb-10">
                        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-(--color-primary)">
                            KickZone
                        </p>

                        <h1 className="mb-4 text-4xl font-bold">
                            Cookie Settings
                        </h1>

                        <p className="max-w-2xl leading-7 text-(--color-text-muted)">
                            Manage how cookies are used when you visit KickZone.
                            You can choose which optional cookies you would like
                            to allow.
                        </p>
                    </div>

                    {/* Necessary Cookies */}
                    <div className="mb-5 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <h2 className="mb-2 text-lg font-bold">
                                    Necessary Cookies
                                </h2>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    These cookies are required for essential website
                                    functionality, such as authentication, shopping
                                    cart functionality, security, and checkout.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={preferences.necessary}
                                disabled
                                className="h-5 w-5"
                            />
                        </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="mb-5 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <h2 className="mb-2 text-lg font-bold">
                                    Analytics Cookies
                                </h2>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    These cookies help us understand how visitors use
                                    KickZone so we can improve website performance and
                                    user experience.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={preferences.analytics}
                                onChange={() => handleChange("analytics")}
                                className="h-5 w-5 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="mb-8 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <h2 className="mb-2 text-lg font-bold">
                                    Marketing Cookies
                                </h2>

                                <p className="text-sm leading-6 text-(--color-text-muted)">
                                    These cookies may be used to provide relevant
                                    offers, promotions, and marketing content.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={preferences.marketing}
                                onChange={() => handleChange("marketing")}
                                className="h-5 w-5 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Save */}
                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-xl bg-(--color-primary) px-6 py-3 text-sm font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark)"
                    >
                        Save Preferences
                    </button>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default CookieSettings;