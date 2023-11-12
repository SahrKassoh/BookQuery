import React, { useState } from 'react';
import axios from 'axios';
import './CreateBook.css';

const CreateBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
  });

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with the following data:', bookData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.post('http://127.0.0.1:8000/books/create/', bookData, config)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        // Handle success by clearing the form
        setBookData({
          title: '',
          author: '',
          category: ''
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="create-book-form">
      <h1 className="createbook">Create Your Own Book</h1>
      <p className="p" >Enjoy the freedom that BookQuery.com gives you and use your creative imagination and knowledge to create your own,
          one of a kind book.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={bookData.category}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBook;





