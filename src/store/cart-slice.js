import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {},

    removeItemFromCart(state, action) {},
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
