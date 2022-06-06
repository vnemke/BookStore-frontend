import { useState, useEffect } from "react";
import Select from "react-select";

import "./AddBook.css";

const AddBook = (props) => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [enteredName, setEnteredName] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [enteredYear, setEnteredYear] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  //fetch authors
  useEffect(() => {
    const getAuthors = async () => {
      const response = await fetch("/api/authors");
      let data = await response.json();
      setAuthors(data);
    };
    getAuthors();
  }, []);

  //fetch genres
  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch("/api/genres");
      let data = await response.json();
      setGenres(data);
    };
    getGenres();
  }, []);

  //fetch publishers
  useEffect(() => {
    const getPublishers = async () => {
      const response = await fetch("/api/publishers");
      let data = await response.json();
      setPublishers(data);
    };
    getPublishers();
  }, []);

  const addBookHandler = (event) => {
    event.preventDefault();
    if (
      enteredName.trim().length === 0 ||
      selectedAuthor.length === 0 ||
      selectedGenre.length === 0 ||
      selectedPublisher.length === 0 ||
      enteredYear.trim() === 0 ||
      enteredPrice.trim() === 0
    ) {
      return;
    }
    if (+enteredYear < 1 || +enteredPrice < 1) {
      return;
    }
    props.onAddBook(
      enteredName,
      selectedAuthor,
      selectedGenre,
      selectedPublisher,
      enteredYear,
      enteredPrice
    );

    setEnteredName("");
    setSelectedAuthor([]);
    setSelectedGenre([]);
    setSelectedPublisher("");
    setEnteredYear("");
    setEnteredPrice("");
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const authorChangeHandler = (event) => {
    const selectedAuthorsId = event.map((a) => a.value);
    setSelectedAuthor(selectedAuthorsId);
  };

  const genreChangeHandler = (event) => {
    const selectedGenresId = event.map((g) => g.value);
    setSelectedGenre(selectedGenresId);
  };
  const publisherChangeHandler = (event) => {
    setSelectedPublisher(event.value);
  };

  const yearChangeHandler = (event) => {
    setEnteredYear(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  //select:authors options
  const authorsOptions = authors.map((a) => ({
    value: a.id,
    label: a.authorName,
  }));

  //select:genres options
  const genresOptions = genres.map((g) => ({
    value: g.id,
    label: g.genreName,
  }));

  //select:publishers options
  const publishersOptions = publishers.map((p) => ({
    value: p.id,
    label: p.publisherName,
  }));

  //select: authors array
  const selectAuthorsValues = authorsOptions.filter((option) =>
    selectedAuthor.includes(option.value)
  );

  //select: genres array
  const selectGenresValues = genresOptions.filter((option) =>
    selectedGenre.includes(option.value)
  );

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
            <Select
              isClearable
              options={authorsOptions}
              isMulti
              value={selectAuthorsValues}
              onChange={authorChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Genre</label>
            <Select
              isClearable
              options={genresOptions}
              isMulti
              value={selectGenresValues}
              onChange={genreChangeHandler}
            />
          </div>
          <div className="col-12 d-flex justify-content-center flex-column">
            <label>Publisher</label>
            <Select
              options={publishersOptions}
              value={selectedPublisher.value}
              onChange={publisherChangeHandler}
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
