import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const RestaurantCard = ({ restaurant }) => {
  const { addToCart, totalItems } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Add first menu item as a representative item
    const item = {
      id: `${restaurant.id}-quick`,
      name: restaurant.name,
      price: restaurant.minPrice || 199,
      image: restaurant.image,
    };

    addToCart(item, {
      id: restaurant.id,
      name: restaurant.name,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.0) return "rating--green";
    if (rating >= 3.5) return "rating--yellow";
    return "rating--orange";
  };

  const isNew = restaurant.isNew || false;
  const hasOffer = restaurant.offer || null;

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <div className="restaurant-card__image-wrap">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x180/f0f0f0/999?text=${encodeURIComponent(restaurant.name)}`;
          }}
        />
        {hasOffer && (
          <div className="restaurant-card__offer">
            <span>🏷️ {hasOffer}</span>
          </div>
        )}
        {isNew && <div className="restaurant-card__new-badge">NEW</div>}
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__header">
          <h3 className="restaurant-card__name">{restaurant.name}</h3>
          <div className={`restaurant-card__rating ${getRatingColor(restaurant.rating)}`}>
            <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
              <path d="M6 1l1.545 3.13L11 4.635l-2.5 2.435.59 3.44L6 8.885l-3.09 1.625L3.5 7.07 1 4.635l3.455-.505L6 1z" />
            </svg>
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <div className="restaurant-card__meta">
          <span className="restaurant-card__time">
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
              <circle cx="8" cy="8" r="7" stroke="#686b78" strokeWidth="1.4" />
              <path d="M8 4.5V8l2.5 1.5" stroke="#686b78" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {restaurant.deliveryTime} mins
          </span>
          <span className="restaurant-card__dot">•</span>
          <span className="restaurant-card__price">
            {formatCurrency(restaurant.minPrice)} for one
          </span>
        </div>

        <p className="restaurant-card__cuisines">{restaurant.cuisines.join(", ")}</p>

        {hasOffer && (
          <div className="restaurant-card__offer-tag">
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
              <path d="M2 8l6-6 6 6v6H2V8z" stroke="#60b246" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            {hasOffer}
          </div>
        )}

        <button
          className={`restaurant-card__add-btn ${added ? "restaurant-card__add-btn--added" : ""}`}
          onClick={handleAddToCart}
          aria-label={`Add ${restaurant.name} to cart`}
        >
          {added ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default RestaurantCard;