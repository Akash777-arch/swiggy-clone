import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

export default function RestaurantCard({ restaurant }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-card__meta">
        <h2>{restaurant.name}</h2>
        <p>{restaurant.cuisine}</p>
        <span>{formatCurrency(restaurant.minimumOrder)}</span>
      </div>
      <Link className="button" to={`/restaurant/${restaurant.id}`}>
        View menu
      </Link>
    </article>
  );
}
