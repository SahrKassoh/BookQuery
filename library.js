import React, { Component } from 'react';
import axios from 'axios';
import './Library.css';

class Library extends Component {
  state = {
    books: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/books/`)
      .then(res => {
        this.setState({
          books: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false
        });
      });
  }

  render() {
    const { books, loading, error } = this.state;

    if (loading) {
      return <div className="library-container">Loading...</div>;
    }

    if (error) {
      return <div className="library-container">Error: {error.message}</div>;
    }

    return (
      <div className="library-container">
        <h1>Library</h1>
        <div className="book-list">
          {books.map(book => (
            <div className="book-item" key={book.id}>
              <h2>{book.title}</h2>
              <p>ID: {book.id}</p>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Library;




