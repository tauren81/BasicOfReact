import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';

export const ReduxStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
