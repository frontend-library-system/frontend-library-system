import { toast } from "react-toastify";
import { useBooks } from "../context/BookContext";
import "./MyLibrary.css";

export const MyLibrary = () => {
  const { requestedBooks, removeRequestedBook } = useBooks();

  // Calculate fine and related metrics
  const calculateFine = () => {
    const currentDate = new Date();
    let overdueBooks = 0;
    let totalFine = 0;
    const finePerDay = 100; // Fine per day in Rs

    requestedBooks.forEach((book) => {
      if (book.status === "Approved" && book.dueDate) {
        const dueDate = new Date(book.dueDate);
        if (dueDate < currentDate) {
          overdueBooks++;
          const overdueMilliseconds = currentDate - dueDate;
          const overdueDays = Math.ceil(overdueMilliseconds / (1000 * 60 * 60 * 24));
          totalFine += overdueDays * finePerDay;
        }
      }
    });

    // Overdue count should include those that are past due and considered overdue
    const overdueBooksStatus = requestedBooks.filter((book) => book.status === "Overdue").length;

    return { overdueBooks: overdueBooks + overdueBooksStatus, totalFine };
  };

  const { overdueBooks, totalFine } = calculateFine();

  // Filter approved books
  const approvedBooks = requestedBooks.filter(
    (book) => book.status === "Approved"
  );

  // Filter books that are "Approved" or "Issued" (which need to be returned)
  const booksToBeReturned = requestedBooks.filter(
    (book) =>
      (book.status === "Approved" || book.status === "Issued") &&
      (new Date(book.dueDate) < new Date() || book.status === "Issued") // Including overdue or issued books
  );

  const handlePayFine = () => {
    if (overdueBooks === 0) {
      toast.success(
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4caf50" }}>
          ✅ No dues to clear! Thank you for being on time.
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } else {
      toast.info(
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2196f3" }}>
          💰 Your total fine is Rs. {totalFine}. Please pay to clear your dues.
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="my-library">
      <h2>Your Requested Books</h2>
      {requestedBooks.length === 0 ? (
        <p>No books requested yet.</p>
      ) : (
        <div className="booksdisplay">
          <div className="booksdisplay-header">
            <p>Cover</p>
            <p>Title</p>
            <p>ISBN</p>
            <p>Status</p>
            <p>Issue Date</p>
            <p>Due Date</p>
            <p>Remove</p>
          </div>
          <hr />
          {requestedBooks.map((book, index) => (
            <div key={index}>
              <div className="booksdisplay-item booksdisplay-header">
                {book.cover_id ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    alt={book.title}
                    className="booksdisplay-cover"
                  />
                ) : (
                  <div className="no-cover">No Image Available</div>
                )}
                <p>{book.title}</p>
                <p>{book.isbn}</p>
                <button
                  className={`status-button-client ${
                    book.status === "Approved"
                      ? "status-approved"
                      : book.status === "Rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}
                  disabled
                >
                  {book.status}
                </button>
                <p>{book.issueDate || "N/A"}</p>
                <p>{book.dueDate ? new Date(book.dueDate).toLocaleString() : "N/A"}</p>
                <button
                  className="booksdisplay-remove"
                  onClick={() => {
                    removeRequestedBook(book.isbn);
                    toast.success(
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#4caf50",
                        }}
                      >
                        ✅ Book removed successfully!
                      </div>,
                      {
                        position: "top-center",
                        autoClose: 3000,
                      }
                    );
                  }}
                >
                  Remove
                </button>
              </div>
              <hr />
            </div>
          ))}

          {/* Fine Summary Section */}
          <div className="booksdisplay-footer">
            <div className="booksdisplay-summary">
              <h1>Fine Summary</h1>
              <div>
                <div className="booksdisplay-summary-item">
                  <p>Total Books Requested</p>
                  <p>{requestedBooks.length}</p>
                </div>
                <div className="booksdisplay-summary-item">
                  <p>Books to Be Returned</p>
                  <p>{booksToBeReturned.length}</p>
                </div>
                <div className="booksdisplay-summary-item">
                  <p>Overdue Books</p>
                  <p>{overdueBooks}</p>
                </div>
                <div className="booksdisplay-summary-item">
                  <p>Total Fine</p>
                  <p>Rs. {totalFine}</p>
                </div>
                <hr />
                <button className="proceed-button" onClick={handlePayFine}>
                  {overdueBooks > 0 ? "Pay Fine" : "Clear Dues"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
