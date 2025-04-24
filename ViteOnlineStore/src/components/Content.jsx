import { useContext } from 'react';
import CartIcon from './CartIcon';
import ShowAlert from './ShowAlert';
import CartList from './CartList';
import ShopList from './ShopList';
import { CartContext } from '../stores/CartContext';

export default function Content() {
  const cart = useContext(CartContext);
  return (
    <main className="container">
      <CartIcon />
      {cart.showAlert && <ShowAlert />}
      <ShopList />
      {cart.showItems && <CartList />}
    </main>
  );
}
