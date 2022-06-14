import { Fragment, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Header from "./components/Layout/Header";
import BooksList from "./components/Books/BooksList";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";
import Auth from "./components/Auth";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {!isAuth && <Auth />}
      {isAuth && (
        <CartProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <Header onShowCart={showCartHandler} />
          <BooksList />
        </CartProvider>
      )}
    </Fragment>
  );
}

export default App;
