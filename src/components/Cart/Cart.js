import { useSelector } from "react-redux";

import CartItem from "./CartItem";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const cartItems = items.map((item, index) => (
    <CartItem
      key={index}
      id={item.id}
      name={item.name}
      quantity={item.quantity}
      price={item.price}
      total={item.totalPrice}
    />
  ));
  return (
    <div>
      {!items.length && <p>No items on cart</p>}
      <ul>{cartItems}</ul>
      {items.length > 0 && <div>Total price: {total}&euro;</div>}
    </div>
  );
};

export default Cart;
