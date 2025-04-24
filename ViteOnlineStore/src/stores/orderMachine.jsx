import { createMachine, assign } from 'xstate';

export const orderMachine = createMachine({
  id: 'order',
  initial: 'browsing',
  context: {
    cart: [],
    orderDetails: null,
    paymentMethod: null,
    shippingAddress: null,
    error: null,
  },
  states: {
    browsing: {
      on: {
        ADD_TO_CART: {
          actions: assign({
            cart: (context, event) => [...context.cart, event.item],
          }),
        },
        REMOVE_FROM_CART: {
          actions: assign({
            cart: (context, event) =>
              context.cart.filter((item) => item.id !== event.itemId),
          }),
        },
        PROCEED_TO_CHECKOUT: 'checkout',
      },
    },
    checkout: {
      on: {
        FILL_SHIPPING: {
          actions: assign({
            shippingAddress: (_, event) => event.shippingAddress,
          }),
        },
        SELECT_PAYMENT: {
          actions: assign({
            paymentMethod: (_, event) => event.paymentMethod,
          }),
        },
        PLACE_ORDER: {
          target: 'placingOrder',
          guard: (context) =>
            context.shippingAddress &&
            context.paymentMethod &&
            context.cart.length > 0,
        },
        CANCEL: 'browsing',
      },
    },
    placingOrder: {
      invoke: {
        src: 'submitOrder',
        onDone: {
          target: 'orderPlaced',
          actions: assign({
            orderDetails: (_, event) => event.data,
          }),
        },
        onError: {
          target: 'checkout',
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    orderPlaced: {
      type: 'final',
    },
  },
});
