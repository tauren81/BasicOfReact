import { createMachine } from 'xstate';

const makeOrderMachine = createMachine({
  id: 'makeOrder',
  initial: 'Inactive',
  states: {
    Inactive: {
      on: { toggle: 'Active' },
    },
    Active: {
      on: { toggle: 'Inactive' },
    },
  },
});
