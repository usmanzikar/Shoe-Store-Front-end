// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import { loadCartState, saveCartState } from '../utils/localStorage';

const preloadedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: preloadedCartState || { items: [] },
  },
});

// Auto-save to localStorage on changes
store.subscribe(() => {
  const { cart } = store.getState();
  saveCartState(cart);
});
