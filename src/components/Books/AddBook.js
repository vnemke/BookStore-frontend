import { useState } from "react";

import "./AddBook.css";

const AddBook = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [enteredYear, setEnteredYear] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  const addBookHandler = (event) => {
    event.preventDefault();
    if(enteredName.trim().length===0 || enteredAuthor.trim().length===0 ||
    enteredYear.trim()===0 || enteredPrice.trim()===0){
        return;
    } 
    if(+enteredYear<1 || +enteredPrice<1){
        return;
    }
    props.onAddBook(enteredName,enteredAuthor,enteredYear,enteredPrice);

    setEnteredName("");
    setEnteredAuthor("");
    setEnteredYear("");
    setEnteredPrice("");
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const authorChangeHandler = (event) => {
    setEnteredAuthor(event.target.value);
  };

  const yearChangeHandler = (event) => {
    setEnteredYear(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={addBookHandler}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Name</label>
            <input
              id="name"
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Author</label>
            <input
              id="author"
              type="text"
              value={enteredAuthor}
              onChange={authorChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Year</label>
            <input
              id="year"
              type="number"
              value={enteredYear}
              onChange={yearChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Price</label>
            <input
              id="price"
              type="number"
              value={enteredPrice}
              onChange={priceChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button type="submit">Add Book</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;