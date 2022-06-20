import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={toggleCartHandler}>
      <span>MyCart</span>
      <span>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
