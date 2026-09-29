import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { data, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { AddressCards } from "../Cards/Address";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Checkout = () => {
    const navigate = useNavigate("");

    const {
        cart,
        clearCart,
    } = useCart();

    const [currentStep, setCurrentStep] = useState(1);
    const [addresses, setAddresses] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Active tab
    const activeTab = searchParams.get("tab") || "personal";
    const { user, logout, updateUserProfile, token } = useAuth();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [deliveryMethod, setDeliveryMethod] = useState("standard");

    const [paymentMethod, setPaymentMethod] = useState("");


    const [paymentLoading, setPaymentLoading] = useState(false);

    const [orderSuccess, setOrderSuccess] = useState(false);

    const [orderId, setOrderId] = useState("");

    const [fetchUser, setFetchUser] = useState("");

    const [userdata, setUserData] = useState({
        name: "",
    });

    // =========================================================
    // FETCH SAVED ADDRESSES
    // =========================================================

    useEffect(() => {

        const fetchUserData = async () => {

            try {

                const authToken =
                    token || localStorage.getItem("userToken");

                if (!authToken) {
                    console.error("No token found");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/user",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Status:", response.status);
                console.log("API response:", data);

                if (!response.ok) {

                    console.error(
                        "User fetch failed:",
                        data
                    );

                    return;
                }


                const fetchedUser =
                    data.user || data;

                setUserData(fetchedUser);

                // Personal profile form
                setFormData({
                    name: fetchedUser.name || "",
                });

                // Fetch saved addresses

                setLoadingAddresses(true);
                const addrResponse = await fetch(
                    "http://localhost:5000/api/user/addresses",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const addrData = await addrResponse.json();
                if (addrResponse.ok) {
                    const fetchedAddresses = addrData.addresses || [];
                    setAddresses(fetchedAddresses);
                    // Set default address as selected if it exists
                    const defaultAddr = fetchedAddresses.find(a => a.isDefault);
                    if (defaultAddr) {
                        setShippingAddress({
                            id: defaultAddr.id,
                            name: defaultAddr.name || "",
                            email: defaultAddr.email || "",
                            phone: defaultAddr.phone || "",
                            address: defaultAddr.address || "",
                            city: defaultAddr.city || "",
                            state: defaultAddr.state || "",
                            pincode: defaultAddr.pincode || defaultAddr.zip_code || defaultAddr.zipCode || "",
                        });
                    }
                }
                setLoadingAddresses(false);

            } catch (error) {

                console.error(
                    "Error fetching user:",
                    error
                );

            }

        };

        fetchUserData();

    }, [token]);


    // =========================================================
    // CART CALCULATIONS
    // =========================================================

    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return (
                total +
                Number(item.price || 0) *
                Number(item.quantity || 0)
            );
        }, 0);
    }, [cart]);

    const shippingCost =
        deliveryMethod === "express" ? 150 : 0;

    // Change this according to your actual tax/GST rules.
    const tax = subtotal * 0.05;

    const total = subtotal + shippingCost + tax;

    // =========================================================
    // FORM HANDLER
    // =========================================================

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // SELECT SAVED ADDRESS
    // =========================================================

    const handleSelectAddress = (address) => {
        const selectedAddress = {
            id: address.id,

            name: address.name || "",
            email: address.email || "",
            phone: address.phone || "",

            address: address.address || "",

            city: address.city || "",

            state: address.state || "",

            pincode:
                address.pincode ||
                address.zip_code ||
                "",
        };

        setShippingAddress(selectedAddress);

        setShowAddressForm(false);
    };

    // =========================================================
    // SAVE MANUAL ADDRESS
    // =========================================================

    const handleAddressSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
        } = formData;

        if (
            !name ||
            !email ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !pincode
        ) {
            alert("Please fill all shipping details.");
            return;
        }

        setShippingAddress({
            ...formData,
        });

        setShowAddressForm(false);
    };

    // =========================================================
    // DELIVERY DATE
    // =========================================================

    const addBusinessDays = (date, days) => {
        const result = new Date(date);

        while (days > 0) {
            result.setDate(result.getDate() + 1);

            const day = result.getDay();

            if (day !== 0 && day !== 6) {
                days--;
            }
        }

        return result;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getDeliveryDates = () => {
        const today = new Date();

        if (deliveryMethod === "express") {
            const start = addBusinessDays(today, 1);
            const end = addBusinessDays(today, 2);

            return `${formatDate(start)} – ${formatDate(end)}`;
        }

        const start = addBusinessDays(today, 3);
        const end = addBusinessDays(today, 5);

        return `${formatDate(start)} – ${formatDate(end)}`;
    };

    // =========================================================
    // VALIDATE SHIPPING
    // =========================================================

    const goToDelivery = () => {
        if (!shippingAddress) {
            alert("Please select or add a shipping address.");
            return;
        }

        setCurrentStep(2);
    };

    if (paymentMethod === "razorpay") {
        // Razorpay logic
    } else if (paymentMethod === "cod") {
        // Cash on Delivery logic
    }

    // =========================================================
    // PAYMENT
    // =========================================================
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");

            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!shippingAddress) {
            alert("Please select or add a shipping address first.");
            setCurrentStep(1);
            return;
        }

        if (!paymentMethod) {
            alert("Please Select a Payment Method");
            return;
        }
        if (paymentMethod === "razorpay") {
            //===========================
            // Razorpay
            //===========================
            try {
                setPaymentLoading(true);

                // Load Razorpay
                const loaded = await loadRazorpay();

                if (!loaded) {
                    alert("Razorpay SDK failed to load");
                    setPaymentLoading(false);
                    return;
                }

                // Create order on backend
                const response = await fetch(
                    "http://localhost:5000/api/user/create-order",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            amount: total,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to create Razorpay order"
                    );
                }

                const razorpayOrder = data.order;

                // Razorpay checkout options
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                    amount: razorpayOrder.amount,

                    currency: razorpayOrder.currency,

                    name: "Your Shoe Store",

                    description: "Shoe Purchase",

                    order_id: razorpayOrder.id,

                    prefill: {
                        name: shippingAddress?.name || user?.name || "",
                        email: shippingAddress?.email || user?.email || "",
                        contact: shippingAddress?.phone || user?.phone || "",
                    },

                    handler: async function (paymentResponse) {

                        try {

                            // STEP 1: Get Razorpay payment details

                            console.log(
                                "Payment ID:",
                                paymentResponse.razorpay_payment_id
                            );

                            console.log(
                                "Order ID:",
                                paymentResponse.razorpay_order_id
                            );

                            console.log(
                                "Signature:",
                                paymentResponse.razorpay_signature
                            );


                            // STEP 2: Send payment details
                            // to your database API

                            const orderResponse = await fetch(
                                "http://localhost:5000/api/user/make-order",
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type": "application/json",
                                    },

                                    body: JSON.stringify({

                                        user_id: user?.id || 1,

                                        totalAmount: total,

                                        payment_method: "razorpay",

                                        razorpay_order_id:
                                            paymentResponse.razorpay_order_id,

                                        razorpay_payment_id:
                                            paymentResponse.razorpay_payment_id,

                                        razorpay_signature:
                                            paymentResponse.razorpay_signature,

                                        items: cart.map((item) => ({
                                            id: item.id,
                                            quantity: item.quantity,
                                            price: item.price,
                                        })),

                                    }),
                                }
                            );


                            // STEP 3: Get backend response

                            const orderData =
                                await orderResponse.json();


                            console.log(
                                "Database response:",
                                orderData
                            );


                            // STEP 4: Check whether database
                            // order was successfully created

                            if (
                                !orderResponse.ok ||
                                !orderData.success
                            ) {

                                throw new Error(
                                    orderData.message ||
                                    "Failed to save order"
                                );

                            }


                            // STEP 5: Order successfully
                            // saved in PostgreSQL

                            console.log(
                                "Order saved:",
                                orderData.order
                            );


                            // STEP 6: Clear cart

                            clearCart();


                            // STEP 7: Show success page

                            setPaymentLoading(false);

                            setOrderSuccess(true);


                        } catch (error) {

                            console.error(
                                "Razorpay order error:",
                                error

                            );

                            alert(
                                error.message ||
                                "Failed to save order"

                            );

                            setPaymentLoading(false);
                        }
                    },
                    modal: {
                        ondismiss: function () {
                            setPaymentLoading(false);
                        },
                    },
                };

                const razorpay =
                    new window.Razorpay(options);

                razorpay.open();


            } catch (error) {
                console.error(error);

                alert(
                    error.message ||
                    "Payment failed"
                );

                setPaymentLoading(false);
            }

        }
        if (paymentMethod === "cod") {
            // =======================================================
            // COD
            // =======================================================

            try {
                setPaymentLoading(true);

                const response = await fetch(
                    "http://localhost:5000/api/user/make-order",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            user_id: user?.id || 1,

                            totalAmount: total,

                            payment_method: "cod",

                            items: cart.map((item) => ({
                                id: item.id,
                                quantity: item.quantity,
                                price: item.price,
                            })),
                        }),
                    }
                );

                const data = await response.json();

                console.log("COD status:", response.status);
                console.log("COD response:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to place COD order"
                    );
                }

                // ==============================================
                // ORDER SUCCESSFULLY STORED
                // ==============================================

                console.log(
                    "COD order created:",
                    data.order
                );

                setPaymentLoading(false);
                setOrderSuccess(true);
                clearCart()



            } catch (error) {
                console.error(
                    "COD order error:",
                    error
                );

                alert(
                    error.message ||
                    "Failed to place COD order"
                );

                setPaymentLoading(false);
            }
        }
    };



    if (cart.length === 0 && !orderSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-(--color-background)">
                <Navbar />

                <main className="flex flex-1 items-center justify-center px-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-(--color-text)">
                            Your cart is empty
                        </h1>

                        <p className="mt-3 text-(--color-secondary-text)">
                            Add some products before proceeding to checkout.
                        </p>

                        <button
                            onClick={() => navigate("/home")}
                            className="mt-6 rounded-xl bg-(--color-primary) px-8 py-3 font-bold text-(--color-surface)"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // =========================================================
    // SUCCESS PAGE
    // =========================================================

    if (orderSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-(--color-background)">
                <Navbar />

                <main className="flex flex-1 items-center justify-center px-4 py-12">
                    <div className="w-full max-w-2xl rounded-3xl bg-(--color-surface) p-8 text-center shadow-sm ring-1 ring-(--color-border) md:p-12">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                            ✓
                        </div>

                        <h1 className="mt-6 text-3xl font-extrabold text-(--color-text)">
                            Order Confirmed!
                        </h1>

                        <p className="mt-3 text-(--color-secondary-text)">
                            Thank you for your purchase.
                            Your order has been placed successfully.
                        </p>

                        <div className="mt-8 rounded-2xl bg-(--color-background) p-6">
                            <p className="text-sm text-(--color-secondary-text)">
                                Order ID
                            </p>

                            <p className="mt-1 text-xl font-bold text-(--color-text)">
                                {orderId}
                            </p>
                        </div>

                        <div className="mt-6 text-left">
                            <h3 className="font-bold text-(--color-text)">
                                Shipping Address
                            </h3>

                            <div className="mt-2 text-sm leading-6 text-(--color-secondary-text)">
                                <p>{userdata.name}</p>
                                <p>{shippingAddress?.address}</p>
                                <p>
                                    {shippingAddress?.city},{" "}
                                    {shippingAddress?.state}
                                </p>
                                <p>
                                    Pincode:{" "}
                                    {shippingAddress?.pincode}
                                </p>
                                <p>
                                    Phone:{" "}
                                    {shippingAddress?.phone}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl bg-(--color-background) p-5">
                            <p className="text-sm text-(--color-secondary-text)">
                                Estimated Delivery
                            </p>

                            <p className="mt-1 font-bold text-(--color-text)">
                                {getDeliveryDates()}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => navigate("/home")}
                                className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-(--color-surface)"
                            >
                                Continue Shopping
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/profile?tab=orders")
                                }
                                className="w-full rounded-xl border border-(--color-border) py-4 font-bold text-(--color-text)"
                            >
                                View Order
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // =========================================================
    // MAIN CHECKOUT
    // =========================================================

    return (
        <div className="min-h-screen flex flex-col bg-(--color-background)">
            <Navbar />

            <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-7xl">

                    {/* PAGE HEADER */}

                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-3xl font-extrabold text-(--color-text)">
                                Checkout
                            </h1>

                            <p className="mt-2 text-sm text-(--color-secondary-text)">
                                Complete your order securely.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/cart")}
                            className="rounded-xl border border-(--color-border) px-5 py-3 text-sm font-bold text-(--color-text)"
                        >
                            ← Back to Cart
                        </button>

                    </div>

                    {/* ================================================= */}
                    {/* STEP INDICATOR */}
                    {/* ================================================= */}

                    <div className="mb-10 overflow-x-auto">

                        <div className="mx-auto flex min-w-[600px] max-w-4xl items-center justify-center">

                            {[
                                "Shipping",
                                "Delivery",
                                "Review",
                                "Payment",
                            ].map((step, index) => {

                                const number = index + 1;

                                const completed =
                                    currentStep > number;

                                const active =
                                    currentStep === number;

                                return (
                                    <div
                                        key={step}
                                        className="flex items-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${completed || active
                                                    ? "bg-(--color-primary) text-(--color-surface)"
                                                    : "bg-(--color-border) text-(--color-secondary-text)"
                                                    }`}
                                            >
                                                {completed
                                                    ? "✓"
                                                    : number}
                                            </div>

                                            <span
                                                className={`mt-2 text-xs font-semibold ${active
                                                    ? "text-(--color-text)"
                                                    : "text-(--color-secondary-text)"
                                                    }`}
                                            >
                                                {step}
                                            </span>

                                        </div>

                                        {number < 4 && (
                                            <div
                                                className={`mx-3 mb-6 h-0.5 w-12 sm:w-24 ${currentStep > number
                                                    ? "bg-(--color-primary)"
                                                    : "bg-(--color-border)"
                                                    }`}
                                            />
                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* CHECKOUT CONTENT */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* LEFT SIDE */}

                        <div className="lg:col-span-2">

                            {/* ================================================= */}
                            {/* STEP 1 - SHIPPING */}
                            {/* ================================================= */}

                            {currentStep === 1 && (

                                <div className="rounded-3xl bg-(--color-surface) p-6 shadow-sm ring-1 ring-(--color-border) md:p-8">

                                    <h2 className="text-2xl font-bold text-(--color-text)">
                                        Shipping Address
                                    </h2>

                                    <p className="mt-2 text-sm text-(--color-secondary-text) mb-6">
                                        Where should we deliver your order?
                                    </p>

                                    {/* LOADING */}

                                    {loadingAddresses && (
                                        <div className="py-10 text-center text-(--color-secondary-text)">
                                            Loading saved addresses...
                                        </div>
                                    )}

                                    {/* SAVED ADDRESSES */}

                                    {!showAddressForm && (
                                        <>
                                            <AddressCards
                                                addresses={addresses}
                                                onSelect={handleSelectAddress}
                                                selectedAddressId={shippingAddress?.id}
                                            />
                                            {!loadingAddresses && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddressForm(true)}
                                                    className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-(--color-primary) px-4 py-2.5 text-xs font-bold text-(--color-surface) hover:bg-(--color-primary-dark) cursor-pointer"
                                                >
                                                    Add New Address
                                                </button>

                                            )}
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(2)}
                                                className="mt-6 inline-flex ml-4 items-center gap-1.5 rounded-xl bg-(--color-primary) px-4 py-2.5 text-xs font-bold text-(--color-surface) hover:bg-(--color-primary-dark) cursor-pointer">Next</button>
                                        </>
                                    )}

                                    {!loadingAddresses &&
                                        showAddressForm && (

                                            <form
                                                onSubmit={handleAddressSubmit}
                                                className="mt-8"
                                            >

                                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                                    {[
                                                        {
                                                            label: "Full Name",
                                                            name: "name",
                                                        },
                                                        {
                                                            label: "Email",
                                                            name: "email",
                                                            type: "email",
                                                        },
                                                        {
                                                            label: "Phone Number",
                                                            name: "phone",
                                                        },
                                                        {
                                                            label: "Pincode",
                                                            name: "pincode",
                                                        },
                                                        {
                                                            label: "City",
                                                            name: "city",
                                                        },
                                                        {
                                                            label: "State",
                                                            name: "state",
                                                        },
                                                    ].map((field) => (

                                                        <div key={field.name}>

                                                            <label className="mb-2 block text-sm font-semibold text-(--color-text)">
                                                                {field.label}
                                                            </label>

                                                            <input
                                                                type={
                                                                    field.type ||
                                                                    "text"
                                                                }
                                                                name={field.name}
                                                                value={
                                                                    formData[field.name]
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-(--color-text) outline-none focus:border-(--color-primary)"
                                                            />

                                                        </div>

                                                    ))}

                                                    <div className="md:col-span-2">

                                                        <label className="mb-2 block text-sm font-semibold text-(--color-text)">
                                                            Address
                                                        </label>

                                                        <textarea
                                                            name="address"
                                                            rows="3"
                                                            value={
                                                                formData.address
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="w-full resize-none rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-(--color-text) outline-none focus:border-(--color-primary)"
                                                        />

                                                    </div>

                                                </div>

                                                <div className="mt-8 flex gap-4">

                                                    {addresses.length > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowAddressForm(false)
                                                            }
                                                            className="w-full rounded-xl border border-(--color-border) py-4 font-bold text-(--color-text)"
                                                        >
                                                            Back
                                                        </button>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-(--color-surface)"
                                                    >
                                                        Continue to Delivery
                                                    </button>

                                                </div>

                                            </form>
                                        )}

                                </div>
                            )}

                            {/* ================================================= */}
                            {/* STEP 2 - DELIVERY */}
                            {/* ================================================= */}

                            {currentStep === 2 && (

                                <div className="rounded-3xl bg-(--color-surface) p-6 shadow-sm ring-1 ring-(--color-border) md:p-8">

                                    <h2 className="text-2xl font-bold text-(--color-text)">
                                        Delivery Options
                                    </h2>

                                    <p className="mt-2 text-sm text-(--color-secondary-text)">
                                        Choose your preferred delivery method.
                                    </p>

                                    <div className="mt-8 space-y-4">

                                        {/* STANDARD */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeliveryMethod(
                                                    "standard"
                                                )
                                            }
                                            className={`w-full rounded-2xl border p-5 text-left ${deliveryMethod ===
                                                "standard"
                                                ? "border-(--color-primary) ring-2 ring-(--color-primary)"
                                                : "border-(--color-border)"
                                                }`}
                                        >

                                            <div className="flex gap-4">

                                                <div
                                                    className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${deliveryMethod ===
                                                        "standard"
                                                        ? "border-(--color-primary)"
                                                        : "border-(--color-border)"
                                                        }`}
                                                >
                                                    {deliveryMethod ===
                                                        "standard" && (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-(--color-primary)" />
                                                        )}
                                                </div>

                                                <div className="flex-1">

                                                    <div className="flex justify-between">

                                                        <h3 className="font-bold text-(--color-text)">
                                                            Standard Shipping
                                                        </h3>

                                                        <span className="font-bold text-(--color-text)">
                                                            FREE
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 text-sm text-(--color-secondary-text)">
                                                        3–5 business days
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-(--color-primary)">
                                                        Estimated delivery:{" "}
                                                        {getDeliveryDates()}
                                                    </p>

                                                </div>

                                            </div>

                                        </button>

                                        {/* EXPRESS */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeliveryMethod(
                                                    "express"
                                                )
                                            }
                                            className={`w-full rounded-2xl border p-5 text-left ${deliveryMethod ===
                                                "express"
                                                ? "border-(--color-primary) ring-2 ring-(--color-primary)"
                                                : "border-(--color-border)"
                                                }`}
                                        >

                                            <div className="flex gap-4">

                                                <div
                                                    className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${deliveryMethod ===
                                                        "express"
                                                        ? "border-(--color-primary)"
                                                        : "border-(--color-border)"
                                                        }`}
                                                >
                                                    {deliveryMethod ===
                                                        "express" && (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-(--color-primary)" />
                                                        )}
                                                </div>

                                                <div className="flex-1">

                                                    <div className="flex justify-between">

                                                        <h3 className="font-bold text-(--color-text)">
                                                            Express Shipping
                                                        </h3>

                                                        <span className="font-bold text-(--color-text)">
                                                            ₹150
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 text-sm text-(--color-secondary-text)">
                                                        1–2 business days
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-(--color-primary)">
                                                        Estimated delivery:{" "}
                                                        {getDeliveryDates()}
                                                    </p>

                                                </div>

                                            </div>

                                        </button>

                                    </div>

                                    <div className="mt-8 flex gap-4">

                                        <button
                                            onClick={() =>
                                                setCurrentStep(1)
                                            }
                                            className="w-full rounded-xl border border-(--color-border) py-4 font-bold text-(--color-text)"
                                        >
                                            Back
                                        </button>

                                        <button
                                            onClick={() =>
                                                setCurrentStep(3)
                                            }
                                            className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-(--color-surface)"
                                        >
                                            Continue to Review
                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* ================================================= */}
                            {/* STEP 3 - REVIEW */}
                            {/* ================================================= */}

                            {currentStep === 3 && (

                                <div className="space-y-5">

                                    {/* ========================================= */}
                                    {/* ORDER ITEMS */}
                                    {/* ========================================= */}

                                    <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">

                                        {/* HEADER */}

                                        <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-5">

                                            <div>
                                                <h2 className="text-xl font-bold text-(--color-text)">
                                                    Review Your Order
                                                </h2>

                                                <p className="mt-1 text-sm text-(--color-secondary-text)">
                                                    {cart.length}{" "}
                                                    {cart.length === 1 ? "item" : "items"} in your order
                                                </p>
                                            </div>

                                        </div>


                                        {/* PRODUCTS */}

                                        <div className="divide-y divide-(--color-border)">

                                            {cart.map((item) => (

                                                <div
                                                    key={item.id}
                                                    className="flex gap-4 px-6 py-5"
                                                >

                                                    {/* IMAGE */}

                                                    <div className="relative shrink-0">

                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-20 w-20 rounded-xl object-cover ring-1 ring-(--color-border)"
                                                        />

                                                        {/* QUANTITY */}

                                                        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-(--color-text) px-1.5 text-xs font-bold text-(--color-surface)">
                                                            {item.quantity}
                                                        </span>

                                                    </div>


                                                    {/* PRODUCT DETAILS */}

                                                    <div className="min-w-0 flex-1">

                                                        <h3 className="truncate font-semibold text-(--color-text)">
                                                            {item.name}
                                                        </h3>

                                                        <div className="mt-2 flex flex-wrap gap-2">

                                                            {item.size && (

                                                                <span className="rounded-md bg-(--color-background) px-2.5 py-1 text-xs font-medium text-(--color-secondary-text)">
                                                                    Size: {item.size}
                                                                </span>

                                                            )}

                                                            <span className="rounded-md bg-(--color-background) px-2.5 py-1 text-xs font-medium text-(--color-secondary-text)">
                                                                Qty: {item.quantity}
                                                            </span>

                                                        </div>

                                                        <p className="mt-2 text-xs text-(--color-secondary-text)">
                                                            ₹{Number(item.price || 0).toFixed(2)} per item
                                                        </p>

                                                    </div>


                                                    {/* PRICE */}

                                                    <div className="flex shrink-0 flex-col items-end justify-center">

                                                        <p className="font-bold text-(--color-text)">
                                                            ₹
                                                            {(
                                                                Number(item.price || 0) *
                                                                Number(item.quantity || 0)
                                                            ).toFixed(2)}
                                                        </p>

                                                        <p className="mt-1 text-xs text-(--color-secondary-text)">
                                                            Item total
                                                        </p>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>


                                    {/* ========================================= */}
                                    {/* SHIPPING ADDRESS */}
                                    {/* ========================================= */}

                                    <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">

                                        <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-4">

                                            <div>

                                                <h3 className="font-bold text-(--color-text)">
                                                    Shipping Address
                                                </h3>

                                                <p className="mt-1 text-xs text-(--color-secondary-text)">
                                                    Your delivery address
                                                </p>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(1)}
                                                className="rounded-lg px-3 py-2 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary)/10"
                                            >
                                                Change
                                            </button>

                                        </div>


                                        <div className="p-6">

                                            <div className="rounded-xl bg-(--color-background) p-4">

                                                <p className="font-bold text-(--color-text)">
                                                    {shippingAddress?.name}
                                                </p>

                                                <div className="mt-2 space-y-1 text-sm leading-5 text-(--color-secondary-text)">

                                                    <p>
                                                        {shippingAddress?.address}
                                                    </p>

                                                    <p>
                                                        {shippingAddress?.city},{" "}
                                                        {shippingAddress?.state}
                                                    </p>

                                                    <p>
                                                        Pincode: {shippingAddress?.pincode}
                                                    </p>

                                                </div>


                                                <div className="mt-4 border-t border-(--color-border) pt-3">

                                                    <p className="text-sm text-(--color-secondary-text)">

                                                        <span className="font-semibold text-(--color-text)">
                                                            Phone:
                                                        </span>{" "}

                                                        {shippingAddress?.phone}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ========================================= */}
                                    {/* DELIVERY METHOD */}
                                    {/* ========================================= */}

                                    <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">

                                        <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-4">

                                            <div>

                                                <h3 className="font-bold text-(--color-text)">
                                                    Delivery Method
                                                </h3>

                                                <p className="mt-1 text-xs text-(--color-secondary-text)">
                                                    Selected shipping option
                                                </p>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(2)}
                                                className="rounded-lg px-3 py-2 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary)/10"
                                            >
                                                Change
                                            </button>

                                        </div>


                                        <div className="p-6">

                                            <div className="flex items-center justify-between rounded-xl bg-(--color-background) p-4">

                                                <div>

                                                    <p className="font-semibold text-(--color-text)">
                                                        {deliveryMethod === "express"
                                                            ? "Express Shipping"
                                                            : "Standard Shipping"}
                                                    </p>

                                                    <p className="mt-1 text-sm text-(--color-secondary-text)">
                                                        {getDeliveryDates()}
                                                    </p>

                                                </div>


                                                <div className="text-right">

                                                    <p className="font-bold text-(--color-text)">
                                                        {deliveryMethod === "express"
                                                            ? "₹150"
                                                            : "FREE"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-(--color-secondary-text)">
                                                        Shipping charge
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ========================================= */}
                                    {/* BUTTONS */}
                                    {/* ========================================= */}

                                    <div className="flex gap-4 pt-2">

                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) py-4 font-bold text-(--color-text) transition hover:bg-(--color-background)"
                                        >
                                            Back
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(4)}
                                            className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-(--color-surface) shadow-sm transition hover:opacity-90"
                                        >
                                            Continue to Payment
                                        </button>

                                    </div>

                                </div>

                            )}

                            {/* ================================================= */}
                            {/* STEP 4 - PAYMENT */}
                            {/* ================================================= */}

                            {currentStep === 4 && (


                                <div className="rounded-3xl bg-(--color-surface) p-6 shadow-sm ring-1 ring-(--color-border) md:p-8">

                                    <h2 className="text-2xl font-bold text-(--color-text)">
                                        Payment
                                    </h2>

                                    <p className="mt-2 text-sm text-(--color-secondary-text)">
                                        Select your payment method.
                                    </p>

                                    <div className="mt-8 space-y-4">


                                        {/* PAYMENT METHODS */}

                                        <div className="space-y-4">

                                            {/* RAZORPAY */}

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("razorpay")}
                                                className={`w-full rounded-2xl border p-5 text-left ${paymentMethod === "razorpay"
                                                    ? "border-(--color-primary) ring-2 ring-(--color-primary)"
                                                    : "border-(--color-border)"
                                                    }`}
                                            >
                                                <div className="flex gap-4">

                                                    <div
                                                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "razorpay"
                                                            ? "border-(--color-primary)"
                                                            : "border-(--color-border)"
                                                            }`}
                                                    >
                                                        {paymentMethod === "razorpay" && (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-(--color-primary)" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="font-bold text-(--color-text)">
                                                            Pay Now
                                                        </h3>

                                                        <p className="mt-1 text-sm text-(--color-secondary-text)">
                                                            UPI, Credit/Debit Card, Net Banking and Wallets
                                                        </p>
                                                    </div>

                                                </div>
                                            </button>


                                            {/* CASH ON DELIVERY */}

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("cod")}
                                                className={`w-full rounded-2xl border p-5 text-left ${paymentMethod === "cod"
                                                    ? "border-(--color-primary) ring-2 ring-(--color-primary)"
                                                    : "border-(--color-border)"
                                                    }`}
                                            >
                                                <div className="flex gap-4">

                                                    <div
                                                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "cod"
                                                            ? "border-(--color-primary)"
                                                            : "border-(--color-border)"
                                                            }`}
                                                    >
                                                        {paymentMethod === "cod" && (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-(--color-primary)" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="font-bold text-(--color-text)">
                                                            Cash on Delivery
                                                        </h3>

                                                        <p className="mt-1 text-sm text-(--color-secondary-text)">
                                                            Pay in cash when your order is delivered
                                                        </p>
                                                    </div>

                                                </div>
                                            </button>

                                        </div>


                                        {/* BUTTONS */}

                                        <div className="mt-8 flex gap-4">

                                            {/* BACK */}

                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(3)}
                                                disabled={paymentLoading}
                                                className="w-full rounded-xl border border-(--color-border) py-4 font-bold text-(--color-text)"
                                            >
                                                Back
                                            </button>


                                            {/* PAYMENT / ORDER BUTTON */}

                                            <button
                                                type="button"
                                                onClick={handlePayment}
                                                disabled={paymentLoading || !paymentMethod}
                                                className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-(--color-surface) disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {paymentLoading
                                                    ? "Processing..." : !paymentMethod
                                                        ? "Select Payment Method" : paymentMethod === "razorpay"
                                                            ? `Pay ₹${total.toFixed(2)}` : `Pay ₹${total.toFixed(2)}`
                                                }
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>

                        {/* ================================================= */}
                        {/* RIGHT SIDE - ORDER SUMMARY */}
                        {/* ================================================= */}

                        <div className="lg:col-span-1">

                            <div className="sticky top-24 rounded-3xl bg-(--color-surface) p-6 shadow-sm ring-1 ring-(--color-border)">

                                <h2 className="text-xl font-bold text-(--color-text)">
                                    Order Summary
                                </h2>

                                {/* PRODUCTS */}

                                <div className="mt-6 space-y-4">

                                    {cart.map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3"
                                        >

                                            <div className="relative">

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-16 w-16 rounded-xl object-cover"
                                                />

                                                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-(--color-primary) text-xs font-bold text-(--color-surface)">
                                                    {item.quantity}
                                                </span>

                                            </div>

                                            <div className="flex-1">

                                                <p className="text-sm font-bold text-(--color-text)">
                                                    {item.name}
                                                </p>

                                                <p className="text-xs text-(--color-secondary-text)">
                                                    ₹
                                                    {Number(
                                                        item.price || 0
                                                    ).toFixed(2)}
                                                </p>

                                            </div>

                                            <p className="text-sm font-bold text-(--color-text)">
                                                ₹
                                                {(
                                                    Number(
                                                        item.price || 0
                                                    ) *
                                                    Number(
                                                        item.quantity || 0
                                                    )
                                                ).toFixed(2)}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                                {/* TOTALS */}

                                <div className="mt-6 space-y-4 border-t border-(--color-border) pt-6">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-(--color-secondary-text)">
                                            Subtotal
                                        </span>

                                        <span className="font-semibold text-(--color-text)">
                                            ₹{subtotal.toFixed(2)}
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-(--color-secondary-text)">
                                            Shipping
                                        </span>

                                        <span className="font-semibold text-(--color-text)">
                                            {shippingCost === 0
                                                ? "FREE"
                                                : `₹${shippingCost.toFixed(
                                                    2
                                                )}`}
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-(--color-secondary-text)">
                                            Tax
                                        </span>

                                        <span className="font-semibold text-(--color-text)">
                                            ₹{tax.toFixed(2)}
                                        </span>

                                    </div>

                                    <div className="border-t border-(--color-border) pt-4">

                                        <div className="flex justify-between">

                                            <span className="text-lg font-extrabold text-(--color-text)">
                                                Total
                                            </span>

                                            <span className="text-lg font-extrabold text-(--color-text)">
                                                ₹{total.toFixed(2)}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Checkout;