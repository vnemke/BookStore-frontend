import { useState, Fragment } from "react";

import "./BooksList.css";
import Book from "./Book";
import AddBook from "./AddBook";

const random_books = [
  {
    id: "b1",
    name: "Jungle book",
    author: "Rudyard Kipling",
    year: 1894,
    price: 15,
  },
  {
    id: "b2",
    name: "Tom Sawyer",
    author: "Mark Twain",
    year: 1876,
    price: 12,
  },
  {
    id: "b3",
    name: "Harry Potter",
    author: "J. K. Rowling",
    year: 1997,
    price: 20,
  },
];

const BooksList = () => {
  const [booksList, setBooksList] = useState(random_books);

  const addBookHandler = (bName, bAuthor, bYear, bPrice) => {
    setBooksList((prevBooksList) => {
      return [
        ...prevBooksList,
        {
          id: Math.random().toString(),
          name: bName,
          author: bAuthor,
          year: bYear,
          price: bPrice,
        },
      ];
    });
  };

  const books = booksList.map((book) => (
    <Book
      key={book.id}
      id={book.id}
      name={book.name}
      author={book.author}
      year={book.year}
      price={book.price}
    />
  ));

  return (
    <Fragment>
      <AddBook onAddBook={addBookHandler} />
      <div className="container">{books}</div>
    </Fragment>
  );
};

export default BooksList;
