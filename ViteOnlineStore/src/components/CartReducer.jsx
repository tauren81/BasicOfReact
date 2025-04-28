export default function CartReducer(state, { type, payload }) {
  switch (type) {
    case 'APPEND_ITEM': // добавить товар в корзину
      let newCart = null;
      // нужно проверить, нет ли уже такого товара в корзине
      const itemIndex = state.items.findIndex(
        (value) => value.id === payload.item.id,
      );
      if (itemIndex < 0) {
        // такого товара еще нет
        const newItem = {
          ...payload.item,
          quantity: payload.quantity,
        };
        newCart = [...state.items, newItem];
      } else {
        // такой товар уже есть
        const newItem = {
          ...state.items[itemIndex],
          quantity: state.items[itemIndex].quantity + payload.quantity,
        };
        newCart = [...state.items]; // копия массива state.items
        newCart.splice(itemIndex, 1, newItem);
      }
      return {
        ...state,
        items: newCart,
        showAlert: payload.item.name + ' добавлен в корзину',
      };
    case 'REMOVE_ITEM': // удалить товар из корзины
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload.id),
      };
    case 'TOGGLE_SHOW': // показать/скрыть корзину
      return {
        ...state,
        showItems: !state.showItems,
      };
    case 'HIDE_ALERT': // скрыть сообщение о добавлении в корзину
      return {
        ...state,
        showAlert: null,
      };
    default:
      return state;
  }
}
