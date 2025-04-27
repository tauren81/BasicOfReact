import React from 'react';
import { useMachine } from '@xstate/react';
import orderMachine from '../stores/orderMachine';
import Cart from './Cart';
import { useSelector } from 'react-redux';

/*
// Сервис для отправки заказа (может быть заменен на реальный API вызов)
const submitOrderService = (context) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% успеха для демонстрации
        resolve({
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
          total: context.cart.reduce((sum, item) => sum + item.price, 0),
          items: context.cart,
        });
      } else {
        reject(new Error('Payment failed'));
      }
    }, 1000);
  });
};
*/

/*
const executeAction = async (context, event) => {
  //const { dataToSubmit } = context;
  return {
    orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
    total: context.cart.reduce((sum, item) => sum + item.price, 0),
    items: context.cart,
  };
};
*/

export const OrderSystem = ({ carts }) => {
  const [state, send] = useMachine(orderMachine);

  const cartss = carts; //Cart?.Scopes[0].useSelector((state) => state.cart);

  state.context.cart = cartss.map((item) => [
    { id: item.id, name: item.name, price: item.price },
  ]);

  const { cart, orderDetails, error } = state.context;

  //cart = Cart.cart;

  // В реальном приложении эти данные будут приходить из формы
  const mockShippingAddress = {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
  };

  const mockPaymentMethod = 'credit_card';

  if (state.matches('orderPlaced')) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <p>Order ID: {orderDetails?.orderId}</p>
        <p>Total: ${orderDetails?.total?.toFixed(2)}</p>
        <button
          onClick={() =>
            send({
              type: 'CONTINUE_SHOPPING',
            })
          }
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-system">
      {state.matches('browsing') && (
        <div className="browsing">
          <h2>Products</h2>
          {/*
          <button
            onClick={() =>
              send({
                type: 'ADD_TO_CART',
                item: { id: 1, name: 'Product 1', price: 19.99 },
              })
            }
          >
            Add Product 1
          </button>

          <button
            onClick={() =>
              send({
                type: 'ADD_TO_CART',
                item: { id: 2, name: 'Product 2', price: 29.99 },
              })
            }
          >
            Add Product 2
          </button>

          <h3>Cart ({cart.length})</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)}
                <button
                  onClick={() =>
                    send({
                      type: 'REMOVE_FROM_CART',
                      itemId: item.id,
                    })
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          */}

          {cart.length > 0 && (
            <button onClick={() => send({ type: 'PROCEED_TO_CHECKOUT' })}>
              Proceed to Checkout
            </button>
          )}
        </div>
      )}

      {state.matches('checkout') && (
        <div className="checkout">
          <h2>Checkout</h2>
          <button
            onClick={() =>
              send({
                type: 'FILL_SHIPPING',
                shippingAddress: mockShippingAddress,
              })
            }
          >
            Fill Shipping Info
          </button>

          <button
            onClick={() =>
              send({
                type: 'SELECT_PAYMENT',
                paymentMethod: mockPaymentMethod,
              })
            }
          >
            Select Payment Method
          </button>

          <button
            onClick={() => send({ type: 'PLACE_ORDER' })}
            disabled={!state.can({ type: 'PLACE_ORDER' })}
          >
            Place Order
          </button>

          <button onClick={() => send({ type: 'CANCEL' })}>Cancel</button>
        </div>
      )}

      {state.matches('placingOrder') && (
        <div className="placing-order">
          <p>Processing your order...</p>
        </div>
      )}

      {error && <div className="error">{error.message}</div>}
    </div>
  );
};
