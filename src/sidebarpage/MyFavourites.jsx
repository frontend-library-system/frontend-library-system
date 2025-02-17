import React from "react";
import { useBooks } from "../context/BookContext";
import "./MyFavourites.css";
import { useNavigate } from "react-router-dom";

 const MyFavourites = () => {
  const { savedBooks, removeSavedBook} = useBooks();

  const navigate =useNavigate();

  const handleGotoMyibrary= ()=>{
    navigate('/mylibrary');
  }

  return (
    <div className="my-favourites">
      <h2 className="my-favourites-heading">Your Favourite Books</h2>
      {savedBooks.length === 0 ? (
        <p className="no-favourites">No favourite books added yet.</p>
      ) : (
        <div className="favourites-list">
          {savedBooks.map((book, index) => (
            <div key={index} className="book-card-fav">
              {book.cover_id && (
                <div className="book-card-image-fav">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    alt={book.title}
                  />
                </div>
              )}
              <div className="book-card-content-fav">
                <h3>{book.title}</h3>
                <p><strong>By:</strong> {book.author}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Publisher:</strong> {book.publisher || "Not Available"}</p>
                <p><strong>Edition:</strong> {book.edition || "Not Available"}</p>
                <p><strong>Published:</strong> {book.published_date || "Not Available"}</p>
              </div>
              <div className="book-card-content-fav-button">
                <button className="bookdisplay-remove-fav" onClick={()=> removeSavedBook(book.isbn)}>Remove</button>
                <button className="bookdisplay-remove-fav" onClick={handleGotoMyibrary}>See Requested Books</button>
              </div>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavourites;
