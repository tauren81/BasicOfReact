import CartItem from './CartItem';
import { useContext } from 'react';
import { CartContext } from '../stores/CartContext';

export default function CartList(props) {
  // контекст для доступа к корзине
  const cart = useContext(CartContext);
  // общая стоимость товаров в корзине
  const cost = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div className="cart-modal">
      <i
        className="material-icons cart-modal-close"
        onClick={cart.toggleVisible}
      >
        close
      </i>
      <h5 className="red-text text-lighten-1">Ваша корзина</h5>
      {cart.items.length ? (
        <table className="striped">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Сумма</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <tr>
              <th colSpan="3">Итого</th>
              <th>{cost}</th>
              <th>руб.</th>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </div>
  );
}
