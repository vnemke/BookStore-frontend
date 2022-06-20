import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {

  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.id));
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        quantity: props.quantity,
        price: props.price,
      })
    );
  };

  return (
    <li>
      <div>
        <span>{props.name}</span>
        <div>
          <span>{props.total}&euro;</span>
          <span>x {props.quantity}</span>
        </div>
      </div>
      <div>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
