import { createContext, useReducer } from 'react';
import CartReducer from '@components/CartReducer';

const CartContext = createContext();

const initState = {
  items: [],
  showItems: false,
  showAlert: null,
};

const CartContextProvider = (props) => {
  const [value, dispatch] = useReducer(CartReducer, initState);

  value.append = (item, quantity = 1) => {
    // добавить товар в корзину
    dispatch({
      type: 'APPEND_ITEM',
      payload: { item: item, quantity: quantity },
    });
  };

  value.remove = (id) => {
    // удалить товар из корзины
    dispatch({ type: 'REMOVE_ITEM', payload: { id: id } });
  };

  value.toggleShow = () => {
    // показать/скрыть корзину
    dispatch({ type: 'TOGGLE_SHOW' });
  };

  value.hideAlert = () => {
    // скрыть сообщение о добавлении в корзину
    dispatch({ type: 'HIDE_ALERT' });
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
