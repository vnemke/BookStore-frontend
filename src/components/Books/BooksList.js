import { useState, useEffect, Fragment } from "react";

import "./BooksList.css";
import Book from "./Book";
import AddBook from "./AddBook";
import useHttp from "../../hooks/use-http";

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);

  const { isLoading, error, sendRequest: sendBookRequest } = useHttp();

  useEffect(() => {
    const transformBooks = (data) => {
      setBooksList(data);
    };
    sendBookRequest({ url: "/api/books" }, transformBooks);
  }, [sendBookRequest]);

  const addBookHandler = async (
    name,
    author,
    genre,
    publisher,
    year,
    price
  ) => {
    const book = {
      bookName: name,
      releaseYear: year,
      price: price,
      description: "test",
      coverUrl: "testUrl",
      authors: author,
      genres: genre,
      PublisherId: publisher,
    };

    const crateBook = (book) => {
      setBooksList((prevBooksList) => {
        return [...prevBooksList, book];
      });
    };

    sendBookRequest(
      {
        url: "/api/books",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: book,
      },
      crateBook
    );
  };

  const books = booksList.map((book) => (
    <Book
      key={book.id}
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
      <AddBook onAddBook={addBookHandler} />
      {content}
    </Fragment>
  );
};

export default BooksList;
