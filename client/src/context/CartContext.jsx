import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("swiggy_cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      setCartItems(parsed.items || []);
      setCartRestaurant(parsed.restaurant || null);
    }
  }, []);

  const saveCart = (items, restaurant) => {
    localStorage.setItem(
      "swiggy_cart",
      JSON.stringify({ items, restaurant })
    );
  };

  const addToCart = (item, restaurant) => {
    // If adding from a different restaurant, clear the cart
    if (cartRestaurant && cartRestaurant.id !== restaurant.id) {
      const newItems = [{ ...item, quantity: 1 }];
      setCartItems(newItems);
      setCartRestaurant(restaurant);
      saveCart(newItems, restaurant);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updated;
      if (existing) {
        updated = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }
      saveCart(updated, restaurant);
      return updated;
    });

    if (!cartRestaurant) {
      setCartRestaurant(restaurant);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      let updated;
      if (existing && existing.quantity > 1) {
        updated = prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        updated = prev.filter((i) => i.id !== itemId);
      }
      if (updated.length === 0) {
        setCartRestaurant(null);
        saveCart([], null);
      } else {
        saveCart(updated, cartRestaurant);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartRestaurant(null);
    localStorage.removeItem("swiggy_cart");
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = totalPrice > 0 ? (totalPrice > 500 ? 0 : 40) : 0;
  const taxes = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + taxes;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartRestaurant,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        totalPrice,
        deliveryFee,
        taxes,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;