{
    !isAddress ? (

        <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
                <div>
                    <h3 className="text-xl font-extrabold text-(--color-text)">Saved Addresses</h3>
                    <p className="text-xs text-(--color-secondary-text)">
                        Manage your delivery locations for fast checkout
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => alert("Add address form would open here.")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-(--color-primary) px-3.5 py-2 text-xs font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) cursor-pointer"
                >
                    <FaPlus size={10} /> Add Address
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className={`rounded-2xl border p-5 transition ${addr.isDefault
                            ? "border-(--color-contrast) bg-(--color-contrast)/5 ring-1 ring-(--color-contrast)"
                            : "border-(--color-border) bg-(--color-background)"
                            }`}
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <span className="font-extrabold text-xs text-(--color-text)">{addr.type}</span>
                            {addr.isDefault && (
                                <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-black text-amber-800">
                                    DEFAULT
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-bold text-(--color-text)">{addr.name}</p>
                        <p className="text-xs text-(--color-secondary-text) mt-1">{addr.street}</p>
                        <p className="text-xs text-(--color-secondary-text)">{addr.cityState}</p>
                        <p className="text-xs text-(--color-secondary-text)">{addr.country}</p>
                        <p className="text-xs text-(--color-secondary-text) mt-2 flex items-center gap-1.5">
                            <FaPhone size={10} /> {addr.phone}
                        </p>
                    </div>
                ))}
            </div>
        </div>


    ) : (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--color-secondary-text) mb-1">
                Address
            </label>
            <input
                type="text"
                value={formData.Address_2}
                onChange={(e) => setFormData({ ...formData, Address_2: e.target.value })}
                className="w-full rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm font-medium focus:border-(--color-primary) focus:outline-none"
            />
        </div>
    )
}