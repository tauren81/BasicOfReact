import { useContext } from 'react';
import { CartContext } from '../stores/CartContext';

export default function CartItem(props) {
  const cart = useContext(CartContext);
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.quantity}</td>
      <td>{props.price}</td>
      <td>{props.price * props.quantity}</td>
      <td>
        <i
          className="material-icons cart-item-delete"
          onClick={() => cart.remove(props.id)}
        >
          close
        </i>
      </td>
    </tr>
  );
}
