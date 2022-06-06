import { useState, useEffect, useCallback, Fragment } from "react";

import "./BooksList.css";
import Book from "./Book";
import AddBook from "./AddBook";

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/books");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();

      setBooksList(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addBookHandler = async (
    name,
    author,
    genre,
    publisher,
    year,
    price
  ) => {
    setIsLoading(true);
    setError(null);
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
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();

      setBooksList((prevBooksList) => {
        return [...prevBooksList, data];
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
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
