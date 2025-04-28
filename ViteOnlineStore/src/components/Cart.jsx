import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItemFromCart,
  addItemToCart,
  deleteItemFromCart,
  clearCart,
} from '../stores/cartSlice';

import { OrderSystem } from './OrderSystem';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.totalQuantity === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} width="200px" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Цена: {item.price} ₽</p>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => dispatch(removeItemFromCart(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addItemToCart(item))}>
                    +
                  </button>
                  <button
                    onClick={() => dispatch(deleteItemFromCart(item.id))}
                    className="delete-btn"
                  >
                    Удалить
                  </button>
                </div>
                <div className="item-total">Итого: {item.totalPrice} ₽</div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Общая сумма: {cart.totalAmount} ₽</h3>
            <p>Количество товаров: {cart.totalQuantity}</p>
            <button onClick={() => dispatch(clearCart())} className="clear-btn">
              Очистить корзину
            </button>
          </div>
        </>
      )}

      {cart?.totalQuantity > 0 ? <OrderSystem carts={cart?.items} /> : <></>}
    </div>
  );
};

export default Cart;
