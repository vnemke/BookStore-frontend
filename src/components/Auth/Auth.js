
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import "../Auth/Auth.css";

const Auth = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());
  };



  return (
    <div className="login-container">
      <form onSubmit={loginHandler}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Email</label>
            <input id="email" type="text" />
          </div>

          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Password</label>
            <input id="password" type="text" />
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
