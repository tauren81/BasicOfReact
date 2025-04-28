import { useContext } from 'react';
import { CartContext } from '../stores/CartContext';

export default function CartIcon() {
  const cart = useContext(CartContext);
  return (
    <div className="cart-icon" onClick={cart.toggleShow}>
      <i className="material-icons">shopping_cart</i>
      {cart.items.length ? <span>{cart.items.length}</span> : null}
    </div>
  );
}
