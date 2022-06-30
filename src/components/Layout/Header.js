import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store/auth-slice";
import CartButton from "./CartButton";

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/books">Books list</NavLink>
          </li>
        </ul>
      </nav>
      <CartButton />
      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
};

export default Header;
