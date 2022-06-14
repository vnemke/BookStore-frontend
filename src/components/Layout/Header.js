import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { authActions } from "../../store/auth";
import HeaderCartButton from "./HeaderCartButton";

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
          <HeaderCartButton onClick={props.onShowCart} />
          <button onClick={logoutHandler}>Logout</button>
        </Fragment>
      )}
    </header>
  );
};

export default Header;
