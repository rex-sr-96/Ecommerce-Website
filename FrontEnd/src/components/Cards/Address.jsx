import React from "react";
import { FaPlus, FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const AddressCards = ({
    addresses,
    setIsAddress,
    handleEditAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    onSelect,
    selectedAddressId,
}) => {
    const location = useLocation();
    const isCheckout = location.pathname === "/checkout";

    return (
        <div className={isCheckout ? "space-y-6" : "rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm space-y-6"}>
            {/* Header */}
            {!isCheckout && (
                <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-(--color-text)">
                            Saved Addresses
                        </h3>
                        <p className="text-xs text-(--color-secondary-text)">
                            Manage your delivery locations for fast checkout
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsAddress(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-(--color-primary) px-3.5 py-2 text-xs font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) cursor-pointer"
                    >
                        <FaPlus size={10} />
                        Add Address
                    </button>
                </div>
            )}

            {/* Addresses List */}
            {addresses && addresses.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            onClick={() => onSelect && onSelect(addr)}
                            className={`relative rounded-2xl border p-5 transition ${onSelect ? "cursor-pointer hover:border-(--color-primary)" : ""
                                } ${selectedAddressId === addr.id
                                    ? "border-(--color-primary) bg-(--color-primary)/5 ring-1 ring-(--color-primary)"
                                    : addr.isDefault
                                        ? "border-(--color-contrast) bg-(--color-contrast)/5 ring-1 ring-(--color-contrast)"
                                        : "border-(--color-border) bg-(--color-background)"
                                }`}
                        >
                            {/* Address Type */}
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-lg bg-(--color-surface) px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-(--color-text)">
                                    {addr.type || "Home"}
                                </span>
                                {addr.isDefault && (
                                    <span className="rounded-md bg-amber-500/20 px-2 py-1 text-[10px] font-black text-amber-800">
                                        DEFAULT
                                    </span>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="space-y-1">
                                <p className="text-sm font-extrabold text-(--color-text)">
                                    {addr.name}
                                </p>
                                {addr.email && (
                                    <p className="text-xs text-(--color-secondary-text)">
                                        {addr.email}
                                    </p>
                                )}
                                {addr.phone && (
                                    <p className="flex items-center gap-1.5 text-xs text-(--color-secondary-text)">
                                        <FaPhone size={10} />
                                        {addr.phone}
                                    </p>
                                )}
                            </div>

                            <div className="my-4 border-t border-(--color-border)" />

                            {/* Address Info */}
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-(--color-text)">
                                    {addr.street || addr.address}
                                </p>
                                <p className="text-xs text-(--color-secondary-text)">
                                    {addr.cityState ||
                                        `${addr.city || ""} ${addr.state || ""} ${addr.zipCode || ""
                                            }`.trim()}
                                </p>
                                {addr.country && (
                                    <p className="text-xs text-(--color-secondary-text)">
                                        {addr.country}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            {!isCheckout && (
                                <div className="mt-5 flex gap-2 border-t border-(--color-border) pt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteAddress && handleDeleteAddress(addr.id)}
                                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                    {!addr.isDefault && (
                                        <button
                                            type="button"
                                            onClick={() => handleSetDefaultAddress && handleSetDefaultAddress(addr.id)}
                                            className="ml-auto rounded-lg bg-(--color-primary) px-3 py-2 text-xs font-semibold text-(--color-surface) hover:bg-(--color-primary-dark) cursor-pointer"
                                        >
                                            Set Default
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-(--color-border) p-8 text-center">
                    <p className="text-sm font-semibold text-(--color-secondary-text)">
                        No saved addresses
                    </p>
                    <p className="mt-1 text-xs text-(--color-secondary-text)">
                        Add an address to make checkout faster.
                    </p>
                </div>
            )}
        </div>
    );
};

export const AddAddressForm = ({
    addressForm,
    setAddressForm,
    handleAddAddress,
    setIsAddress,
}) => {

    const location = useLocation();
    const showAddAddress = location.pathname !== "/checkout";

    return (
        <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-(--color-border) pb-4">
                <div>
                    <h3 className="text-xl font-extrabold text-(--color-text)">
                        Add New Address
                    </h3>
                    <p className="text-xs text-(--color-secondary-text)">
                        Add a new delivery location
                    </p>
                </div>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Address Type */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            Address Type
                        </label>
                        <select
                            value={addressForm.type || "Home"}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    type: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={addressForm.name || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    name: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            required
                            value={addressForm.phone || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>

                    {/* Street */}
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            Street Address
                        </label>
                        <input
                            type="text"
                            required
                            value={addressForm.address || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    address: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            City
                        </label>
                        <input
                            type="text"
                            required
                            value={addressForm.city || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    city: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            State
                        </label>
                        <input
                            type="text"
                            required
                            value={addressForm.state || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    state: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>

                    {/* Zip Code */}
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text)">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            required
                            value={addressForm.zipCode || addressForm.zip_Code || ""}
                            onChange={(e) =>
                                setAddressForm({
                                    ...addressForm,
                                    zipCode: e.target.value,
                                    zip_Code: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
                        />
                    </div>
                </div>

                {/* Default */}
                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) =>
                            setAddressForm({
                                ...addressForm,
                                isDefault: e.target.checked,
                            })
                        }
                        className="h-4 w-4 cursor-pointer"
                    />
                    <label className="text-sm font-medium text-(--color-text)">
                        Set as default address
                    </label>
                </div>

                {/* Buttons */}

                <div className="flex gap-3 border-t border-(--color-border) pt-4">

                    <button
                        type="submit"
                        className="rounded-xl bg-(--color-primary) px-6 py-2.5 text-xs font-bold text-(--color-surface) hover:bg-(--color-primary-dark) cursor-pointer"
                    >
                        Add Address
                    </button>


                    <button
                        type="button"
                        onClick={() => setIsAddress(false)}
                        className="rounded-xl border border-(--color-border) bg-(--color-background) px-5 py-2.5 text-xs font-semibold text-(--color-text) hover:bg-(--color-surface) cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};