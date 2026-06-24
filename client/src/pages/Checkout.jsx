import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

export default function Checkout() {
  const { cart, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="page checkout-page">
      <h1>Checkout</h1>
      {cart.length ? (
        <>
          <ul className="checkout-list">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: {formatCurrency(item.price * item.quantity)}</p>
                </div>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <p>Total: {formatCurrency(total)}</p>
            <button className="button" onClick={clearCart}>
              Place order
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty. Add something delicious from a restaurant.</p>
      )}
    </section>
  );
}
