import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

// Mock restaurant detail data
const RESTAURANT_DETAILS = {
  r1: {
    id: "r1",
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=300&fit=crop",
    rating: 4.3,
    totalRatings: "10K+",
    deliveryTime: 25,
    minPrice: 250,
    cuisines: ["Pizza", "Pasta", "Desserts"],
    address: "Plot 12, Sector 29, Gurugram",
    offer: "50% OFF up to ₹100",
    menu: [
      {
        category: "Recommended",
        items: [
          { id: "r1-m1", name: "Margherita Pizza", price: 199, description: "Classic tomato sauce with mozzarella cheese", isVeg: true, isBestseller: true },
          { id: "r1-m2", name: "Pepperoni Pizza", price: 349, description: "Loaded with pepperoni slices and mozzarella", isVeg: false, isBestseller: true },
          { id: "r1-m3", name: "BBQ Chicken Pizza", price: 399, description: "Smoky BBQ sauce, chicken, and caramelised onions", isVeg: false, isBestseller: false },
        ],
      },
      {
        category: "Pasta",
        items: [
          { id: "r1-m4", name: "Penne Arrabiata", price: 149, description: "Spicy tomato sauce with penne pasta", isVeg: true, isBestseller: false },
          { id: "r1-m5", name: "Chicken Pasta", price: 199, description: "Grilled chicken in creamy white sauce", isVeg: false, isBestseller: false },
        ],
      },
      {
        category: "Desserts",
        items: [
          { id: "r1-m6", name: "Choco Lava Cake", price: 89, description: "Warm chocolate cake with molten center", isVeg: true, isBestseller: true },
        ],
      },
    ],
  },
  r2: {
    id: "r2",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=300&fit=crop",
    rating: 4.1,
    totalRatings: "8K+",
    deliveryTime: 20,
    minPrice: 200,
    cuisines: ["Burgers", "Beverages", "Desserts"],
    address: "Ground Floor, MG Road, Gurugram",
    offer: "Buy 1 Get 1 Free",
    menu: [
      {
        category: "Burgers",
        items: [
          { id: "r2-m1", name: "Whopper", price: 219, description: "Flame-grilled beef patty with fresh veggies", isVeg: false, isBestseller: true },
          { id: "r2-m2", name: "Veg Whopper", price: 179, description: "Crispy veggie patty with BK sauce", isVeg: true, isBestseller: true },
          { id: "r2-m3", name: "Chicken Crispy", price: 159, description: "Crispy fried chicken with lettuce and mayo", isVeg: false, isBestseller: false },
        ],
      },
      {
        category: "Beverages",
        items: [
          { id: "r2-m4", name: "Coke Float", price: 89, description: "Ice cream float with chilled coke", isVeg: true, isBestseller: false },
          { id: "r2-m5", name: "Thick Shake", price: 129, description: "Creamy thick shake in 3 flavors", isVeg: true, isBestseller: false },
        ],
      },
    ],
  },
};

const FALLBACK = {
  id: "unknown",
  name: "Restaurant",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop",
  rating: 4.0,
  totalRatings: "500+",
  deliveryTime: 30,
  minPrice: 200,
  cuisines: ["Multi-cuisine"],
  address: "Gurugram, Haryana",
  offer: null,
  menu: [
    {
      category: "Popular",
      items: [
        { id: "fb-m1", name: "Special Combo", price: 299, description: "Chef's special combo meal", isVeg: false, isBestseller: true },
        { id: "fb-m2", name: "Veg Platter", price: 249, description: "Assorted vegetarian dishes", isVeg: true, isBestseller: false },
      ],
    },
  ],
};

const MenuItemCard = ({ item, restaurant }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const qty = getItemQuantity(item.id);

  return (
    <div className="menu-item">
      <div className="menu-item__info">
        <div className="menu-item__header">
          <span className={`menu-item__veg-icon ${item.isVeg ? "menu-item__veg-icon--veg" : "menu-item__veg-icon--nonveg"}`}>
            <span />
          </span>
          {item.isBestseller && (
            <span className="menu-item__bestseller">⭐ Bestseller</span>
          )}
        </div>
        <h4 className="menu-item__name">{item.name}</h4>
        <p className="menu-item__price">{formatCurrency(item.price)}</p>
        {item.description && (
          <p className="menu-item__desc">{item.description}</p>
        )}
      </div>

      <div className="menu-item__action">
        {qty === 0 ? (
          <button
            className="menu-item__add-btn"
            onClick={() => addToCart(item, { id: restaurant.id, name: restaurant.name })}
          >
            ADD
          </button>
        ) : (
          <div className="menu-item__qty-control">
            <button onClick={() => removeFromCart(item.id)} className="menu-item__qty-btn">−</button>
            <span className="menu-item__qty">{qty}</span>
            <button onClick={() => addToCart(item, { id: restaurant.id, name: restaurant.name })} className="menu-item__qty-btn">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

const RestaurantView = () => {
  const { id } = useParams();
  const { totalItems, totalPrice, grandTotal } = useCart();
  const [activeSection, setActiveSection] = useState(0);

  const restaurant = RESTAURANT_DETAILS[id] || FALLBACK;

  return (
    <div className="restaurant-view">
      {/* Breadcrumb */}
      <div className="restaurant-view__breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Gurugram</span>
        <span>/</span>
        <span>{restaurant.name}</span>
      </div>

      {/* Hero */}
      <div className="restaurant-view__hero">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-view__hero-img" />
        <div className="restaurant-view__hero-overlay" />
        <div className="restaurant-view__hero-info">
          <h1 className="restaurant-view__name">{restaurant.name}</h1>
          <p className="restaurant-view__cuisines">{restaurant.cuisines.join(", ")}</p>
          <p className="restaurant-view__address">📍 {restaurant.address}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="restaurant-view__stats">
        <div className="restaurant-view__stat">
          <svg viewBox="0 0 12 12" fill="white" width="12" height="12">
            <path d="M6 1l1.545 3.13L11 4.635l-2.5 2.435.59 3.44L6 8.885l-3.09 1.625L3.5 7.07 1 4.635l3.455-.505L6 1z" />
          </svg>
          <span className="restaurant-view__stat-val">{restaurant.rating}</span>
          <span className="restaurant-view__stat-label">{restaurant.totalRatings} ratings</span>
        </div>
        <div className="restaurant-view__stat-divider" />
        <div className="restaurant-view__stat">
          <span className="restaurant-view__stat-val">{restaurant.deliveryTime} min</span>
          <span className="restaurant-view__stat-label">Delivery Time</span>
        </div>
        <div className="restaurant-view__stat-divider" />
        <div className="restaurant-view__stat">
          <span className="restaurant-view__stat-val">{formatCurrency(restaurant.minPrice)}</span>
          <span className="restaurant-view__stat-label">For one</span>
        </div>
      </div>

      {restaurant.offer && (
        <div className="restaurant-view__offer">
          🏷️ {restaurant.offer}
        </div>
      )}

      {/* Menu */}
      <div className="restaurant-view__menu-layout">
        {/* Category Sidebar */}
        <aside className="restaurant-view__menu-sidebar">
          {restaurant.menu.map((section, idx) => (
            <button
              key={section.category}
              className={`restaurant-view__menu-cat ${activeSection === idx ? "restaurant-view__menu-cat--active" : ""}`}
              onClick={() => setActiveSection(idx)}
            >
              {section.category}
              <span className="restaurant-view__menu-cat-count">({section.items.length})</span>
            </button>
          ))}
        </aside>

        {/* Menu Items */}
        <div className="restaurant-view__menu-items">
          {restaurant.menu.map((section, idx) => (
            <div
              key={section.category}
              className={`restaurant-view__menu-section ${activeSection !== idx ? "restaurant-view__menu-section--hidden-mobile" : ""}`}
            >
              <h3 className="restaurant-view__menu-category">
                {section.category}{" "}
                <span className="restaurant-view__menu-category-count">
                  ({section.items.length})
                </span>
              </h3>
              <div className="restaurant-view__menu-list">
                {section.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} restaurant={restaurant} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <div className="restaurant-view__cart-bar">
          <div className="restaurant-view__cart-bar-info">
            <span className="restaurant-view__cart-bar-count">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
            <span className="restaurant-view__cart-bar-total">{formatCurrency(totalPrice)}</span>
          </div>
          <Link to="/checkout" className="restaurant-view__cart-bar-btn">
            View Cart →
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantView;