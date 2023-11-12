import React, { useState } from 'react';
import axios from 'axios';
import './FindBook.css'; // Ensure this is the correct path to your CSS file

const FindBook = () => {
  const [bookId, setBookId] = useState('');
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setBookId(e.target.value);
    setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const id = parseInt(bookId, 10);
    if (isNaN(id)) {
      setError('Please enter a valid integer for the book ID.');
      return;
    }
    axios.get(`http://127.0.0.1:8000/books/${id}/`)
      .then((response) => {
        setBookData(response.data);
        setError('');
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('No book found with the provided ID.');
        } else {
          setError('An error occurred while searching for the book.');
        }
      });
  };

  return (
    <div className="find-book-container">
      <div className="find-book-form">
        <h1>  Find Book</h1>
        <p>If you know the identification number of a specific book. And want
        to find the information simply enter the book ID!</p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={bookId}
            onChange={handleInputChange}
            placeholder="Enter book ID"
          />
          <button type="submit">Find Book</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      {bookData && (
        <div className="book-details">
          <h3>Book Details</h3>
          <p>Title: {bookData.title}</p>
          <p>Author: {bookData.author}</p>
          <p>Category: {bookData.category}</p>
        </div>
      )}
    </div>
  );
};

export default FindBook;

