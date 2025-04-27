import { createMachine, assign, fromPromise, setup } from 'xstate';
//import { executeAction } from '@components/OrderSystem';

/*
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

const executeAction = async (context) => {
  //const { dataToSubmit } = context;
  return {
    orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
    total: context.cart.reduce((sum, item) => sum + item.price, 0),
    items: context.cart,
  };
};

export const orderMachine = setup({
  actors: {
    executeActionYYY: fromPromise(async ({ input }) => {
      const data = await executeAction(input);
      // ...
      return data;
    }),
  },
}).createMachine({
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
            cart: (
              context,
              event, //[...context.cart, event.item],
            ) => [...context?.context?.cart, context?.event?.item],
          }),
        },
        REMOVE_FROM_CART: {
          actions: assign({
            cart: (context) =>
              context.cart.filter((item) => item.id !== context.event.itemId),
          }),
        },
        PROCEED_TO_CHECKOUT: 'checkout',
      },
    },
    checkout: {
      on: {
        FILL_SHIPPING: {
          actions: assign({
            shippingAddress: (context) => context.event.shippingAddress,
          }),
        },
        SELECT_PAYMENT: {
          actions: assign({
            paymentMethod: (context) => context.event.paymentMethod,
          }),
        },
        PLACE_ORDER: {
          target: 'placingOrder',
          guard: (context) =>
            context?.context?.shippingAddress &&
            context?.context?.paymentMethod &&
            context?.context?.cart?.length > 0,
        },
        //PLACING_ORDER: 'placingOrder',
        CANCEL: 'browsing',
      },
    },
    placingOrder: {
      invoke: {
        /*
        src: fromPromise(({ input: { context } }) =>
          submitOrderService(context),
        //src: 'submitOrder'
        ),
        */
        src: 'executeActionYYY',
        input: ({ context }) => context,
        onDone: {
          target: 'orderPlaced',
          actions: assign({
            orderDetails: (context) => context?.event?.output,
          }),
        },
        onError: {
          target: 'checkout',
          actions: assign({
            actions: assign({ error: ({ event }) => event.error }),
          }),
        },
      },
    },
    orderPlaced: {
      type: 'final',
    },
  },
});

export default orderMachine;
