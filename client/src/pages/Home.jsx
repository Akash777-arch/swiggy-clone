import { useState, useRef } from "react";
import RestaurantCard from "../components/RestaurantCard";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: "Pizza", emoji: "🍕", tag: "Pizza" },
  { id: 2, name: "Burger", emoji: "🍔", tag: "Burgers" },
  { id: 3, name: "Biryani", emoji: "🍚", tag: "Biryani" },
  { id: 4, name: "Chinese", emoji: "🍜", tag: "Chinese" },
  { id: 5, name: "Sushi", emoji: "🍣", tag: "Sushi" },
  { id: 6, name: "Rolls", emoji: "🌯", tag: "Rolls" },
  { id: 7, name: "Desserts", emoji: "🍰", tag: "Desserts" },
  { id: 8, name: "South Indian", emoji: "🥘", tag: "South Indian" },
  { id: 9, name: "North Indian", emoji: "🫕", tag: "North Indian" },
  { id: 10, name: "Thali", emoji: "🍱", tag: "Thali" },
  { id: 11, name: "Pasta", emoji: "🍝", tag: "Pasta" },
  { id: 12, name: "Sandwich", emoji: "🥪", tag: "Sandwich" },
  { id: 13, name: "Shake", emoji: "🥤", tag: "Shake" },
  { id: 14, name: "Healthy", emoji: "🥗", tag: "Healthy Food" },
];

const RESTAURANTS = [
  {
    id: "r1",
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop",
    rating: 4.3,
    deliveryTime: 25,
    minPrice: 250,
    cuisines: ["Pizza", "Pasta", "Desserts"],
    offer: "50% OFF up to ₹100",
    isNew: false,
    area: "Sector 29",
  },
  {
    id: "r2",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
    rating: 4.1,
    deliveryTime: 20,
    minPrice: 200,
    cuisines: ["Burgers", "Beverages", "Desserts"],
    offer: "Buy 1 Get 1 Free",
    isNew: false,
    area: "MG Road",
  },
  {
    id: "r3",
    name: "Paradise Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=250&fit=crop",
    rating: 4.5,
    deliveryTime: 35,
    minPrice: 300,
    cuisines: ["Biryani", "North Indian", "Kebabs"],
    offer: "Flat ₹125 OFF",
    isNew: false,
    area: "Cyber City",
  },
  {
    id: "r4",
    name: "Chinese Wok",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=250&fit=crop",
    rating: 3.9,
    deliveryTime: 30,
    minPrice: 180,
    cuisines: ["Chinese", "Asian", "Noodles"],
    offer: null,
    isNew: true,
    area: "Sohna Road",
  },
  {
    id: "r5",
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    rating: 4.2,
    deliveryTime: 22,
    minPrice: 150,
    cuisines: ["Burgers", "Fast Food", "Beverages"],
    offer: "Free McSaver Meal",
    isNew: false,
    area: "DLF Phase 4",
  },
  {
    id: "r6",
    name: "Haldiram's",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=250&fit=crop",
    rating: 4.4,
    deliveryTime: 40,
    minPrice: 200,
    cuisines: ["North Indian", "South Indian", "Sweets", "Thali"],
    offer: "20% OFF",
    isNew: false,
    area: "Sector 14",
  },
  {
    id: "r7",
    name: "Wow! Momo",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=250&fit=crop",
    rating: 4.0,
    deliveryTime: 28,
    minPrice: 150,
    cuisines: ["Chinese", "Rolls", "Desserts"],
    offer: null,
    isNew: true,
    area: "Udyog Vihar",
  },
  {
    id: "r8",
    name: "Barbeque Nation",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop",
    rating: 4.6,
    deliveryTime: 45,
    minPrice: 600,
    cuisines: ["North Indian", "Biryani", "Kebabs"],
    offer: "Flat ₹200 OFF",
    isNew: false,
    area: "Golf Course Road",
  },
  {
    id: "r9",
    name: "Subway",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=250&fit=crop",
    rating: 3.8,
    deliveryTime: 20,
    minPrice: 180,
    cuisines: ["Sandwich", "Healthy Food", "Salads"],
    offer: "BOGO Sub",
    isNew: false,
    area: "Sector 56",
  },
  {
    id: "r10",
    name: "Sushi Garden",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=250&fit=crop",
    rating: 4.3,
    deliveryTime: 35,
    minPrice: 450,
    cuisines: ["Sushi", "Japanese", "Asian"],
    offer: null,
    isNew: true,
    area: "Golf Course Road",
  },
  {
    id: "r11",
    name: "Amul Ice Cream & More",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
    rating: 4.1,
    deliveryTime: 18,
    minPrice: 80,
    cuisines: ["Desserts", "Ice Cream", "Shake"],
    offer: "30% OFF",
    isNew: false,
    area: "Palam Vihar",
  },
  {
    id: "r12",
    name: "Saravana Bhavan",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=250&fit=crop",
    rating: 4.5,
    deliveryTime: 30,
    minPrice: 200,
    cuisines: ["South Indian", "Thali", "Healthy Food"],
    offer: null,
    isNew: false,
    area: "Sector 23",
  },
];

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { key: "relevance", label: "Relevance" },
  { key: "rating", label: "Rating" },
  { key: "deliveryTime", label: "Delivery Time" },
  { key: "costLow", label: "Cost: Low to High" },
  { key: "costHigh", label: "Cost: High to Low" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Home = ({ searchQuery = "" }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSortKey, setActiveSortKey] = useState("relevance");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const categoryScrollRef = useRef(null);

  // Filter by search
  const searchFiltered = RESTAURANTS.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
      r.area.toLowerCase().includes(q)
    );
  });

  // Filter by category
  const categoryFiltered = searchFiltered.filter((r) => {
    if (!activeCategory) return true;
    return r.cuisines.some(
      (c) => c.toLowerCase() === activeCategory.tag.toLowerCase()
    );
  });

  // Sort
  const sorted = [...categoryFiltered].sort((a, b) => {
    switch (activeSortKey) {
      case "rating":
        return b.rating - a.rating;
      case "deliveryTime":
        return a.deliveryTime - b.deliveryTime;
      case "costLow":
        return a.minPrice - b.minPrice;
      case "costHigh":
        return b.minPrice - a.minPrice;
      default:
        return 0;
    }
  });

  const handleCategoryClick = (cat) => {
    setActiveCategory((prev) => (prev?.id === cat.id ? null : cat));
  };

  const scrollCategories = (dir) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <main className="home">
      {/* Hero Banner */}
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">
            Order food &amp; <span>groceries</span> at your doorstep
          </h1>
          <p className="home__hero-sub">Delivering to Gurugram, Haryana</p>
        </div>
        <div className="home__hero-banner">
          <div className="home__hero-badge">
            <span className="home__hero-badge-num">30</span>
            <span className="home__hero-badge-text">min delivery</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="home__categories">
        <div className="home__section-header">
          <h2 className="home__section-title">What&apos;s on your mind?</h2>
        </div>
        <div className="home__categories-scroll-wrap">
          <button
            className="home__categories-arrow home__categories-arrow--left"
            onClick={() => scrollCategories(-1)}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M15 18l-6-6 6-6" stroke="#3d4152" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="home__categories-list" ref={categoryScrollRef}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`home__category-item ${activeCategory?.id === cat.id ? "home__category-item--active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={activeCategory?.id === cat.id}
              >
                <div className="home__category-emoji">{cat.emoji}</div>
                <span className="home__category-name">{cat.name}</span>
              </button>
            ))}
          </div>

          <button
            className="home__categories-arrow home__categories-arrow--right"
            onClick={() => scrollCategories(1)}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M9 18l6-6-6-6" stroke="#3d4152" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {activeCategory && (
          <div className="home__category-active-banner">
            <span>
              Showing restaurants for: <strong>{activeCategory.name}</strong>
            </span>
            <button onClick={() => setActiveCategory(null)} className="home__category-clear">
              ✕ Clear
            </button>
          </div>
        )}
      </section>

      <div className="home__divider" />

      {/* Restaurants Section */}
      <section className="home__restaurants">
        <div className="home__section-header home__section-header--flex">
          <h2 className="home__section-title">
            Top restaurant chains in{" "}
            <span className="home__city">Gurugram</span>
          </h2>

          {/* Filters Row */}
          <div className="home__filters">
            <button
              className={`home__filter-btn home__filter-btn--veg ${isVegOnly ? "home__filter-btn--active-veg" : ""}`}
              onClick={() => setIsVegOnly(!isVegOnly)}
            >
              <span className="home__veg-dot" />
              Pure Veg
            </button>

            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className={`home__filter-btn ${activeSortKey === opt.key ? "home__filter-btn--active" : ""}`}
                onClick={() =>
                  setActiveSortKey((prev) =>
                    prev === opt.key ? "relevance" : opt.key
                  )
                }
              >
                {opt.label}
                {activeSortKey === opt.key && opt.key !== "relevance" && (
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="home__empty">
            <div className="home__empty-emoji">🍽️</div>
            <h3>No restaurants found</h3>
            <p>
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search.`
                : `No restaurants available for ${activeCategory?.name}. Try another category.`}
            </p>
            <button
              className="home__empty-btn"
              onClick={() => {
                setActiveCategory(null);
              }}
            >
              View All Restaurants
            </button>
          </div>
        ) : (
          <div className="home__restaurant-grid">
            {sorted.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <div className="home__footer-logo">
          <div className="home__footer-logo-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#FC8019" />
              <path d="M12 28C12 28 13 18 20 14C27 10 28 20 28 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="22" r="4" fill="white" />
            </svg>
          </div>
          <span>swiggy</span>
        </div>
        <div className="home__footer-cols">
          <div className="home__footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Team</a>
            <a href="#">Swiggy One</a>
          </div>
          <div className="home__footer-col">
            <h4>Contact</h4>
            <a href="#">Help & Support</a>
            <a href="#">Partner with us</a>
            <a href="#">Ride with us</a>
          </div>
          <div className="home__footer-col">
            <h4>Legal</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="home__footer-bottom">
          <p>© {new Date().getFullYear()} Swiggy Clone. Built for educational purposes.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;