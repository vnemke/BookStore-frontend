import { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./BooksList.css";
import Book from "./Book";
import AddBook from "../Add-Book/AddBook";
import useHttp from "../../../hooks/use-http";

//sorting function
const sortBooks = (books, ascending) => {
  return books.sort((bookA, bookB) => {
    if (ascending) {
      return bookA.price > bookB.price ? 1 : -1;
    } else {
      return bookA.price < bookB.price ? 1 : -1;
    }
  });
};

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [newBook, setNewBook] = useState({});
  const { isLoading, error, sendRequest: sendBooksRequest } = useHttp();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedBooks = sortBooks(booksList, isSortingAscending);

  const changeSortingHandler = () => {
    navigate(
      `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    );
  };

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

  const books = sortedBooks.map((book, index) => (
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
    content = (
      <div className="container">
        <button onClick={changeSortingHandler}>
          {isSortingAscending ? "Descending" : "Ascending"}
        </button>
        {books}
      </div>
    );
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
