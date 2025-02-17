import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context for managing books
const BookContext = createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

// Create a provider component
export const BookProvider = ({ children }) => {
  // retrieve the stored books from localStorage, or use an empty if none exist
  const storedBooks = JSON.parse(localStorage.getItem("requestedBooks")) || [];
  const storedSavedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

  const [requestedBooks, setRequestedBooks] = useState(storedBooks);
  const [savedBooks, setSavedBooks] = useState(storedSavedBooks);

  // Function to add a book to the requested books list
  const addRequestedBook = (book) => {
    setRequestedBooks((prevBooks) => {
      const existingBookIndex = prevBooks.findIndex(
        (b) => b.isbn === book.isbn
      );

      if (existingBookIndex >= 0) {
        const updatedBooks = [...prevBooks];
        updatedBooks[existingBookIndex].quantity += 1;
        localStorage.setItem("requestedBooks", JSON.stringify(updatedBooks));
        return updatedBooks;
      }

      const newBooks = [
        ...prevBooks,
        { ...book, quantity: 1, price: generateRandomPrice(), status: "Requested" },
      ];
      localStorage.setItem("requestedBooks", JSON.stringify(newBooks));
      return newBooks;
    });
  };

  // Function to add a book to the saved books list
  const addSavedBook = (book) => {
    setSavedBooks((prevBooks) => {
      if (!prevBooks.find((b) => b.isbn === book.isbn)) {
        const newBooks = [...prevBooks, book];
        localStorage.setItem("savedBooks", JSON.stringify(newBooks));
        return newBooks;
      }
      return prevBooks;
    });
  };

  // Function to remove a saved book
  const removeSavedBook = (isbn) => {
    const updatedSavedBooks = savedBooks.filter((book) => book.isbn !== isbn);
    setSavedBooks(updatedSavedBooks);
    localStorage.setItem("savedBooks", JSON.stringify(updatedSavedBooks));
  };

  // Function to remove a book from the requested books list
  const removeRequestedBook = (isbn) => {
    setRequestedBooks((prevBooks) => {
      // Filter out the book with the matching ISBN
      const updatedBooks = prevBooks.filter((book) => book.isbn !== isbn);
      localStorage.setItem("requestedBooks", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  // Function to update the book status
  const updateBookStatus = (isbn, newStatus, issueDetails = {}) => {
    setRequestedBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.isbn === isbn
          ? {
              ...book,
              status: newStatus,
              issueDate: issueDetails.issueDate || null,
              dueDate: issueDetails.dueDate || null,
            }
          : book
      );
      localStorage.setItem("requestedBooks", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  // Persist books to localStorage whenever the requestedBooks or savedBooks state changes
  useEffect(() => {
    localStorage.setItem("requestedBooks", JSON.stringify(requestedBooks));
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [requestedBooks, savedBooks]);

  // Function to generate a random price in Nepali Rupees (NPR)
  const generateRandomPrice = () => {
    return Math.floor(Math.random() * (5000 - 500 + 1) + 500); // Random price between 500 and 5000 NPR
  };

  return (
    <BookContext.Provider
      value={{
        requestedBooks,
        savedBooks,
        addRequestedBook,
        addSavedBook,
        removeRequestedBook,
        removeSavedBook,
        updateBookStatus,
        generateRandomPrice,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
