import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";

// import Auth from "./components/Auth/Auth";
import Welcome from "./components/Welcome";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import NotFound from "./components/NotFound";

const BooksList = lazy(() => import("./components/Books/Books-List/BooksList"));

const BookDetails = lazy(() =>
  import("./components/Books/Book-Details/BookDetails")
);

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
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
    <Router>
      <Header />
      {showCart && <Cart />}
      <Suspense fallback={<div>Loading data...</div>}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/books" />} />
          <Route path="*" element={<NotFound />}></Route>

          <Route path="/home" element={<Welcome />} />
          <Route path="/books" element={<BooksList />} />

          <Route path="/books/:bookId" element={<BookDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
