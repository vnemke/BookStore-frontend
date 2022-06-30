import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

import "../Books-List/BooksList.css";

const BookDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const bookId = +params.bookId;

  const [book, setBook] = useState({
    bookName: "",
    Authors: [],
    Genres: [],
    Publisher: {},
    year: "",
    price: "",
    description: "",
  });
  const { sendRequest } = useHttp();

  useEffect(() => {
    const transformBook = (data) => {
      setBook(data);
    };
    sendRequest({ url: "/api/books/" + bookId }, transformBook);
  }, [sendRequest, bookId]);

  const backToList = () => {
    navigate("/books");
  };

  if (!book) {
    return <p>No book found!</p>;
  }

  const authors = book.Authors.map((a) => <div key={a.id}>{a.authorName}</div>);
  const genres = book.Genres.map((g) => <div key={g.id}>{g.genreName}</div>);

  return (
    <div className="row  book_card">
      <div className="col-12">{book.bookName}</div>
      <div className="col-12">{authors}</div>
      <div className="col-12">{genres}</div>
      <div className="col-12">{book.releaseYear} </div>
      <div className="col-12">Price: {book.price}&euro;</div>
      <div className="col-12">Publisher: {book.Publisher.publisherName}</div>
      <div className="col-12">Description:</div>
      <div className="col-12">{book.description}</div>
      <div className="col-12 add_button">
        <button onClick={backToList}>Cancel</button>
      </div>
    </div>
  );
};

export default BookDetails;
