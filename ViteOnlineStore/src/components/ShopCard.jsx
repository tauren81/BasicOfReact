import { useContext } from 'react';
import { CartContext } from '../stores/CartContext';

export default function ShopCard(props) {
  const { id, name, price, images } = props;
  const item = { id: id, name: name, price: price };
  const cart = useContext(CartContext);
  return (
    <div id={'product-' + id} className="card">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={images.icon} alt="" />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {name}
        </span>
        <p>Цена: {price} руб.</p>
      </div>
      <div className="card-action">
        <button className="btn-small" onClick={() => cart.append(item, 1)}>
          Купить
        </button>
        <button className="btn-small right">Больше</button>
      </div>
    </div>
  );
}
