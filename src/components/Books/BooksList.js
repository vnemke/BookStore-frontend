import { useState, useEffect, Fragment } from "react";

import "./BooksList.css";
import Book from "./Book";
import AddBook from "./AddBook";
import useHttp from "../../hooks/use-http";

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [newBook, setNewBook] = useState({});
  const { isLoading, error, sendRequest: sendBooksRequest } = useHttp();

  useEffect(() => {
    const transformBooks = (data) => {
      setBooksList(data);
    };
    sendBooksRequest({ url: "/api/books" }, transformBooks);
  }, [sendBooksRequest]);

  const passedBook = (book) => {
    setNewBook(book);
  };

  useEffect(() => {
    setBooksList((prevList) => {
      return [...prevList, newBook];
    });
  }, [newBook]);

  const books = booksList.map((book, index) => (
    <Book
      key={index}
      id={book.id}
      name={book.bookName}
      author={book.Authors}
      genre={book.Genres}
      publisher={book.Publisher}
      year={book.releaseYear}
      price={book.price}
    />
  ));

  let content = <p>Found no books</p>;

  if (books.length > 0) {
    content = <div className="container">{books}</div>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <Fragment>
      <AddBook passedBook={passedBook} />
      {content}
    </Fragment>
  );
};

export default BooksList;
