import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload; // Replace with server data
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
