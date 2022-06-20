import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { authActions } from "../../store/auth-slice";
import CartButton from "./CartButton";

const Header = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header>
      {isAuth && (
        <Fragment>
          <CartButton />
          <button onClick={logoutHandler}>Logout</button>
        </Fragment>
      )}
    </header>
  );
};

export default Header;
