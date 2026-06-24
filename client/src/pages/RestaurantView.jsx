import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const restaurantMenu = {
  '1': [
    { id: 'a', name: 'Butter Chicken', price: 320 },
    { id: 'b', name: 'Paneer Tikka', price: 240 },
  ],
  '2': [
    { id: 'c', name: 'Chicken Chow Mein', price: 220 },
    { id: 'd', name: 'Veg Dumplings', price: 160 },
  ],
  '3': [
    { id: 'e', name: 'Quinoa Salad', price: 220 },
    { id: 'f', name: 'Smoothie Bowl', price: 190 },
  ],
};

export default function RestaurantView() {
  const { id } = useParams();
  const { addItem } = useCart();
  const menu = restaurantMenu[id] || [];

  return (
    <section className="page restaurant-page">
      <h1>Restaurant menu</h1>
      <div className="menu-grid">
        {menu.length ? (
          menu.map((item) => (
            <article key={item.id} className="menu-item">
              <div>
                <h2>{item.name}</h2>
                <p>Price: ₹{item.price}</p>
              </div>
              <button onClick={() => addItem(item)}>Add to cart</button>
            </article>
          ))
        ) : (
          <p>Restaurant not found.</p>
        )}
      </div>
    </section>
  );
}
