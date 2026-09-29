import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart
} from "react-icons/fa";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemsCount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-extrabold text-(--color-text) mb-8">Shopping Cart</h1>

          {cart.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items List */}
              <div className="flex-1 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl bg-(--color-surface) p-4 shadow-sm ring-1 ring-(--color-border)">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-(--color-background)">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-(--color-text)">{item.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-(--color-secondary-text)">₹{(Number(item.price) || 0).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded-xl border border-(--color-border) bg-(--color-background)">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center text-(--color-text) transition hover:bg-(--color-border) rounded-l-xl"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="flex h-10 w-10 items-center justify-center text-sm font-bold text-(--color-text)">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center text-(--color-text) transition hover:bg-(--color-border) rounded-r-xl"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Remove item"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="rounded-3xl bg-(--color-surface) p-6 shadow-sm ring-1 ring-(--color-border) sticky top-24">
                  <h2 className="text-xl font-bold text-(--color-text) mb-6">Order Summary</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-(--color-secondary-text)">Subtotal ({cartItemsCount} items)</span>
                      <span className="font-semibold text-(--color-text)">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-(--color-secondary-text)">Shipping</span>
                      <span className="font-semibold text-(--color-text)">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-(--color-secondary-text)">Tax</span>
                      <span className="font-semibold text-(--color-text)">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-(--color-border) pt-4 mt-4 flex justify-between">
                      <span className="text-lg font-extrabold text-(--color-text)">Total</span>
                      <span className="text-lg font-extrabold text-(--color-text)">₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckout()}
                    className="mt-8 w-full rounded-xl bg-(--color-primary) py-4 text-sm font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark)"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--color-surface) shadow-sm ring-1 ring-(--color-border)">
                <FaShoppingCart size={32} className="text-(--color-secondary-text)" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-(--color-text)">Your cart is empty</h2>
              <p className="mt-2 max-w-md text-(--color-secondary-text)">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/home"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-(--color-primary) px-8 text-sm font-semibold text-(--color-surface) transition hover:bg-(--color-primary-dark)"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

