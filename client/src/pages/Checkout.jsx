import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";

const Checkout = () => {
  const {
    cartItems,
    cartRestaurant,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    deliveryFee,
    taxes,
    grandTotal,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(
    user ? "102, Sector 26, DLF Phase 1, Gurugram - 122002" : ""
  );
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const couponDiscount = couponApplied ? Math.round(totalPrice * 0.1) : 0;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "SWIGGY10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try SWIGGY10");
      setCouponApplied(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
    setOrderPlaced(true);
    clearCart();
  };

  // ── Order Success Screen ─────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="checkout__success">
        <div className="checkout__success-icon">✅</div>
        <h2 className="checkout__success-title">Order Placed Successfully!</h2>
        <p className="checkout__success-sub">
          Your order will arrive in approximately <strong>30–35 minutes</strong>.
        </p>
        <div className="checkout__success-track">
          <div className="checkout__track-step checkout__track-step--done">
            <div className="checkout__track-dot" />
            <div>
              <p className="checkout__track-label">Order Placed</p>
              <p className="checkout__track-time">Just now</p>
            </div>
          </div>
          <div className="checkout__track-line" />
          <div className="checkout__track-step">
            <div className="checkout__track-dot checkout__track-dot--pending" />
            <div>
              <p className="checkout__track-label">Preparing Food</p>
              <p className="checkout__track-time">~10 mins</p>
            </div>
          </div>
          <div className="checkout__track-line" />
          <div className="checkout__track-step">
            <div className="checkout__track-dot checkout__track-dot--pending" />
            <div>
              <p className="checkout__track-label">Out for Delivery</p>
              <p className="checkout__track-time">~25 mins</p>
            </div>
          </div>
          <div className="checkout__track-line" />
          <div className="checkout__track-step">
            <div className="checkout__track-dot checkout__track-dot--pending" />
            <div>
              <p className="checkout__track-label">Delivered 🎉</p>
              <p className="checkout__track-time">~35 mins</p>
            </div>
          </div>
        </div>
        <Link to="/" className="checkout__success-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  // ── Empty Cart ────────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="checkout__empty">
        <div className="checkout__empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add items from a restaurant to get started!</p>
        <Link to="/" className="checkout__empty-btn">
          Explore Restaurants
        </Link>
      </div>
    );
  }

  const finalTotal = grandTotal - couponDiscount;

  return (
    <div className="checkout">
      <div className="checkout__header">
        <Link to="/" className="checkout__back">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="#3d4152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Menu
        </Link>
        <h1 className="checkout__title">Checkout</h1>
      </div>

      <div className="checkout__layout">
        {/* LEFT — Cart & Address */}
        <div className="checkout__left">
          {/* Delivery Address */}
          <div className="checkout__card">
            <h3 className="checkout__card-title">
              <span>📍</span> Delivery Address
            </h3>
            <textarea
              className="checkout__address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address..."
              rows={3}
            />
          </div>

          {/* Cart Items */}
          <div className="checkout__card">
            <h3 className="checkout__card-title">
              <span>🛍️</span> Order from{" "}
              {cartRestaurant?.name || "Restaurant"}
            </h3>

            <div className="checkout__items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout__item">
                  <div className="checkout__item-info">
                    <p className="checkout__item-name">{item.name}</p>
                    <p className="checkout__item-price">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="checkout__item-qty">
                    <button
                      className="checkout__qty-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="checkout__qty-btn"
                      onClick={() =>
                        addToCart(item, {
                          id: cartRestaurant?.id,
                          name: cartRestaurant?.name,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="checkout__item-subtotal">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="checkout__clear-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* Coupon */}
          <div className="checkout__card">
            <h3 className="checkout__card-title">
              <span>🏷️</span> Apply Coupon
            </h3>
            <div className="checkout__coupon-row">
              <input
                type="text"
                className="checkout__coupon-input"
                placeholder="Enter coupon code (try SWIGGY10)"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponError("");
                  setCouponApplied(false);
                }}
              />
              <button
                className="checkout__coupon-btn"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="checkout__coupon-success">
                ✅ Coupon applied! You save {formatCurrency(couponDiscount)}
              </p>
            )}
            {couponError && (
              <p className="checkout__coupon-error">{couponError}</p>
            )}
          </div>

          {/* Payment */}
          <div className="checkout__card">
            <h3 className="checkout__card-title">
              <span>💳</span> Payment Method
            </h3>
            <div className="checkout__payment-options">
              {[
                { key: "upi", label: "UPI / GPay", icon: "📱" },
                { key: "card", label: "Credit / Debit Card", icon: "💳" },
                { key: "cod", label: "Cash on Delivery", icon: "💵" },
                { key: "wallet", label: "Swiggy Wallet", icon: "👛" },
              ].map((opt) => (
                <label key={opt.key} className="checkout__payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value={opt.key}
                    checked={paymentMethod === opt.key}
                    onChange={() => setPaymentMethod(opt.key)}
                  />
                  <span className="checkout__payment-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            {paymentMethod === "upi" && (
              <input
                type="text"
                className="checkout__upi-input"
                placeholder="Enter UPI ID (e.g. name@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="checkout__right">
          <div className="checkout__summary-card">
            <h3 className="checkout__summary-title">Bill Details</h3>

            <div className="checkout__summary-row">
              <span>Item Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="checkout__summary-row">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="checkout__free">FREE</span>
                ) : (
                  formatCurrency(deliveryFee)
                )}
              </span>
            </div>
            <div className="checkout__summary-row">
              <span>Taxes & Charges</span>
              <span>{formatCurrency(taxes)}</span>
            </div>
            {couponApplied && (
              <div className="checkout__summary-row checkout__summary-row--discount">
                <span>Coupon Discount</span>
                <span>− {formatCurrency(couponDiscount)}</span>
              </div>
            )}
            <div className="checkout__summary-divider" />
            <div className="checkout__summary-row checkout__summary-row--total">
              <span>To Pay</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>

            {deliveryFee === 0 && (
              <p className="checkout__free-delivery-note">
                🎉 You saved ₹40 on delivery!
              </p>
            )}

            <button
              className={`checkout__place-btn ${isLoading ? "checkout__place-btn--loading" : ""}`}
              onClick={handlePlaceOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="checkout__spinner" />
                  Placing Order...
                </>
              ) : (
                `Place Order • ${formatCurrency(finalTotal)}`
              )}
            </button>

            <p className="checkout__secure-note">
              🔒 100% Secure Payments
            </p>
          </div>

          <div className="checkout__safety-card">
            <h4>Safety First 🛡️</h4>
            <p>All delivery partners are vaccinated and follow hygiene protocols.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;