import { createSlice } from "@reduxjs/toolkit";

//! Create ui slice :
const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice.reducer;

//! Create actions :
export const uiActions = uiSlice.actions;

//! Create action creator thunk :
export const sendCartData = function (cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending ...",
        message: "Sending cart request ...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-shopping-cart-4c8fe-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart request failed !!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success !",
          message: "Sending cart request successfully !",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error !",
          message: "Sending cart request failed !!",
        })
      );
    }
  };
};
