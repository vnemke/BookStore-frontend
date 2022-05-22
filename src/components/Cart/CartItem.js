const CartItem = (props) => {
  //   const price = `$${props.price.toFixed(2)}`;

  return (
    <li>
      <div>
        <span>{props.name}</span>
        <div>
          <span>{props.price}</span>
          <span>x {props.amount}</span>
        </div>
      </div>
      <div>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
