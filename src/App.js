import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";

import Header from "./components/Layout/Header";
import BooksList from "./components/Books/BooksList";
import Cart from "./components/Cart/Cart";
import Auth from "./components/Auth";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {!isAuth && <Auth />}
      {isAuth && (
        <Fragment>
          <Header />
          {showCart && <Cart />}
          <BooksList />
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
