import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { cart } = useCart();
  const { user, login, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="brand">
        <Link to="/">Swiggy Clone</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout ({cart.length})</Link>
        <button className="text-button" onClick={user ? logout : login}>
          {user ? 'Logout' : 'Login'}
        </button>
      </nav>
    </header>
  );
}
