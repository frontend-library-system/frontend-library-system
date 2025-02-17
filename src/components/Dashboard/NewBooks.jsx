import React, { useEffect, useState } from "react";
import "./NewBooks.css";

const NewBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const removeBook = (index) => {
    // Remove the book from the books array
    const updatedBooks = books.filter((book, i) => i !== index);
    // Update localStorage with the new list of books
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks); // Update the state to reflect the removal
  };

  return (
    <div className="new-books-container-book">
      <h2 className="new-books-title1">Book List</h2>
      <div className="books-list-book">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card-book">
              <div className="book-card-image-book">
                {book.avatar ? (
                  <img src={book.avatar} alt={book.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <hr />
              <div className="book-card-content-book">
                <h2>Title: {book.title}</h2>
                <hr />
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Edition:</strong> {book.edition}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>No of Books:</strong> {book.books}</p>
              </div>

              {/* Always show the Remove Book button */}
              <button 
                onClick={() => removeBook(index)} 
                className="remove-book-button">
                Remove Book
              </button>
            </div>
          ))
        ) : (
          <p>No books available. Add some books!</p>
        )}
      </div>
    </div>
  );
};

export default NewBooks;
