import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooks } from "../../context/BookContext"; // Import the hook for accessing context
import "./BookDetails.css";
import { toast } from "react-toastify";

export const BookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    title,
    author,
    cover_id,
    num_pages,
    isbn,
    publisher,
    edition,
    published_date,
    availability,
  } = location.state || {};
  const { addRequestedBook, addSavedBook } = useBooks(); // Access the function to add a book

  //

  // Function to generate a random description
  const [descriptionList, setDescriptionList] = useState([]);

  const generateRandomDescriptions = () => {
    const descriptions = [
      `${title} is a thrilling book that will keep you on the edge of your seat.`,
      `Dive into the world of ${title}, where every page holds a new twist.`,
      `In ${title}, the author presents a captivating story that explores deep emotions.`,
      `A masterpiece like ${title}, filled with suspense and mystery, is a must-read.`,
      `${title} is a thought-provoking tale that will leave you reflecting long after finishing it.`,
      `With stunning prose and memorable characters, ${title} explores themes of love, loss, and redemption.`,
    ];

    // Select 3 random descriptions
    const randomDescriptions = Array.from({ length: 3 }, () => {
      const randomIndex = Math.floor(Math.random() * descriptions.length);
      return descriptions[randomIndex];
    });

    setDescriptionList(randomDescriptions);
  };

  //Generate a random description when the component mounts
  useEffect(() => {
    if (title) {
      generateRandomDescriptions();
    }
  }, [title]); //re-run when title changes

  const handleRequestClick = () => {
    // Add the book to the global state (requestedBooks)
    addRequestedBook({
      title,
      author,
      cover_id,
      num_pages,
      isbn,
      publisher,
      edition,
      published_date,
      availability,
    });

    // Logic to add the book to the library
    toast.success(<div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4caf50" }}>
       📚 Your book has been added to My Library!
    </div>, {
      position: "top-center",
      autoClose: 3000, // Duration (in ms) the toast will stay visible
    });
    navigate("/mylibrary"); // Navigate to MyLibrary after the book is added
  };

  const handleAddedFavourites = () => {
    // Add the book to the global state (requestedBooks)
    addSavedBook({
      title,
      author,
      cover_id,
      num_pages,
      isbn,
      publisher,
      edition,
      published_date,
      availability,
    });

    // Logic to add the book to favorites
    toast.info(<div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4caf50" }}> ⭐ Book has been added to your Favorites!
      </div>, {
      position: "top-center",
      autoClose: 3000,
    });
    navigate("/myfavourites"); //Navigate to MyFavourites after the book is added to myfavourites
  };

  return (
    <div className="book-card">
      <div className="book-card-image">
        {cover_id ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}
            alt={title}
            className="book-image"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="book-card-content">
        <h1>{title}</h1>
        <p>
          <strong>By:</strong> {author}
        </p>
        <p>
          <strong>ISBN:</strong> {isbn}
        </p>
        <p>
          <strong>Publisher:</strong> {publisher || "Not Available"}
        </p>
        <p>
          <strong>Edition:</strong> {edition || "Not Available"}
        </p>
        <p>
          <strong>Published:</strong> {published_date || "Not Available"}
        </p>
        <p>
          <strong>Pages:</strong> {num_pages}
        </p>
        <p>
          <strong>Availability:</strong> {availability || "Not Specified"}
        </p>

        <button className="request-button" onClick={handleRequestClick}>
          Request Book
        </button>
        <br />
        <button className="request-button" onClick={handleAddedFavourites}>
          Add to Favourites
        </button>
      </div>
      <div className="book-card-description">
        <p>
          <strong>Description ▼</strong>
        </p>
        <div>
          {descriptionList.map((desc, index) => (
            <div key={index} className="description-block">
              {desc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
