import RestaurantCard from '../components/RestaurantCard';

const restaurants = [
  { id: '1', name: 'Spice Route', cuisine: 'Indian', minimumOrder: 250 },
  { id: '2', name: 'Noodle House', cuisine: 'Asian', minimumOrder: 180 },
  { id: '3', name: 'Green Garden', cuisine: 'Healthy', minimumOrder: 200 },
];

export default function Home() {
  return (
    <section className="page home-page">
      <h1>Choose a restaurant</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}
