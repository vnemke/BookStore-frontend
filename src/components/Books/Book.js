import { useContext } from "react";

import Quantity from "./Quantity";
import CartContext from "../../store/cart-context";
import "./BooksList.css";

const Book = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className="row book_card">
        <div className="col-12">{props.name}</div>
        <div className="col-12">{props.author}</div>
        <div className="col-12">Year: {props.year}</div>
        <div className="col-12">Price: {props.price}&euro;</div>
        <div className="col-12 add_button">
            <Quantity id={props.id} onAddToCart={addToCartHandler} />
        </div>
    </div>    
  );
};

export default Book;
