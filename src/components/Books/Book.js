import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import "./BooksList.css";

const Book = (props) => {
  const dispatch = useDispatch();


  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price
        // totalPrice: props.price,
      })
    );
  };

  const authors = props.author.map((a) => <div key={a.id}>{a.authorName}</div>);
  const genres = props.genre.map((g) => <div key={g.id}>{g.genreName}</div>);

  return (
    <div className="row book_card">
      <div className="col-12">{props.name}</div>
      <div className="col-12">{authors}</div>
      <div className="col-12">{genres}</div>
      <div className="col-12">Year: {props.year}</div>
      <div className="col-12">Price: {props.price}&euro;</div>
      <div className="col-12">Publisher: {props.publisher.publisherName} </div>
      <div className="col-12 add_button">
        <button onClick={addToCartHandler}>+Add</button>
      </div>
    </div>
  );
};

export default Book;
