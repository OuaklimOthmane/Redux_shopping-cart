import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Pending ...",
          message: "Sending cart request ...",
        })
      );

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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success !",
          message: "Sending cart request successfully !",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartRequest().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error !",
          message: "Sending cart request failed !!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

//? We wanna dispatch the "addItemToCart" action and do all the heavy work inside of the Reducer function. But if we now wanna sync our new state to the server so if we wanna update the server with that new state which we derived on the front end we can simply switch the order. We can first do the work on the front end and let Redux update its store. And then in a second step thereafter we send the request to the server but we don't necessarily need to do that here inside of the Reducer function where we wouldn't be allowed to do it. Instead, we can, for example do it in the "ProductItem.js" file or in a totally different file. Let's say in "App.js" as our root component. There we can simply get hold of our overall "cart" by basically using "useSelector" and listening to changes to our "cart" state. And whenever our "cart" state does change we can send the Http request to the server. And we wanna send a "POST" request because that will tell Firebase to store new data or to be precise, actually here, I wanna send a "PUT" request. That's also allowed by a Firebase. And if we send a "PUT" request we also do store data on Firebase. But the difference to "POST" is that the new data will not be added in a list of data so to say, but that it will override existing data. So when sending a "PUT" request, will override the existing "cart" with the incoming data and that's exactly what we want here.
//! ⚠ We face one problem when using "useEffect" the way we currently do it: It will execute when our app starts. Why is this an issue? It's a problem because this will send the initial (i.e. empty) "cart" to our backend and overwrite any data stored there.
