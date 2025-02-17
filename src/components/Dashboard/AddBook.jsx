import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
  const [bookDetails, setBookDetails] = useState({
    avatar: null, // Store the image as a base64 string
    title: "",
    isbn: "",
    edition: "",
    year: "",
    author: "",
    publisher: "",
    pages: "",
    books: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setBookDetails((prevDetails) => ({
          ...prevDetails,
          avatar: reader.result, // Update avatar in bookDetails
        }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the book details to localStorage
    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    localStorage.setItem("books", JSON.stringify([...existingBooks, bookDetails]));

    // Navigate to the NewBooks component
    navigate("/dashboard/newbooks");
  };

  return (
    <div className="add-book-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
      <div className="divcenterimage">
      <h2 className="add-book-title">Add Book</h2>
        {/* Avatar Preview */}
        <div className="avatar-preview-addbook">
          {bookDetails.avatar ? (
            <img src={bookDetails.avatar} alt="Avatar Preview" className="avatar-image" />
          ) : (
            <div className="avatar-placeholder-addbook">No Image Selected</div>
          )}
        </div>
      </div>
        <label>
          Avatar:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={bookDetails.title} onChange={handleChange} />
        </label>
        <label>
          ISBN:
          <input type="text" name="isbn" value={bookDetails.isbn} onChange={handleChange} />
        </label>
        <label>
          Edition:
          <input type="text" name="edition" value={bookDetails.edition} onChange={handleChange} />
        </label>
        <label>
          Year of Publication:
          <input type="text" name="year" value={bookDetails.year} onChange={handleChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={bookDetails.author} onChange={handleChange} />
        </label>
        <label>
          Publisher:
          <input type="text" name="publisher" value={bookDetails.publisher} onChange={handleChange} />
        </label>
        <label>
          Pages:
          <input type="number" name="pages" value={bookDetails.pages} onChange={handleChange} />
        </label>
        <label>
          No of Books:
          <input type="number" name="books" value={bookDetails.books} onChange={handleChange} />
        </label>
        <button type="submit" className="add-book-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
