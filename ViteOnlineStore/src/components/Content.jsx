//import { useContext } from 'react';
//import CartIcon from './CartIcon';
//import ShowAlert from './ShowAlert';
//import CartList from './CartList';
import ShopList from './ShopList';
//import { CartContext } from '../stores/CartContext';
import Cart from '@components/Cart';
import OrderSystem from './OrderSystem';

export default function Content() {
  //const cart = useContext(CartContext);
  return (
    <main className="container">
      {/*<CartIcon />*/}
      {/*{cart.showAlert && <ShowAlert />}*/}
      <ShopList />
      <Cart />
      {/*{cart.showItems && <CartList />}*/}
      <OrderSystem />
    </main>
  );
}
