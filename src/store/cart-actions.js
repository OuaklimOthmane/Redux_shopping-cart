import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

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
