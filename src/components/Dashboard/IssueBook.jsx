import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useBooks } from "../../context/BookContext"; // Access the BookContext
import "./IssueBook.css";

const IssueBook = () => {
  const { requestedBooks, updateBookStatus } = useBooks();
  const [openStatus, setOpenStatus] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showForm, setShowForm] = useState(false); // Show the form for issuing a book
  const [selectedBook, setSelectedBook] = useState(null); // Store the selected book
  const [issueDate, setIssueDate] = useState(""); // Store Issue Date
  const [dueDate, setDueDate] = useState(""); // Store Due Date

  const [dueTime, setDueTime] = useState({
    year: 2025,
    month: 1,
    day: 25,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: "PM", // AM/PM for due date time
  }); // Store the custom due time

  const statusButtonRef = useRef(null);

  useEffect(() => {
    setIssueDateTime(); // Set the issue date on initial render
  }, []);

  // Function to combine date with the custom time (AM/PM logic)
  const setCustomDateTime = (date, time, ampm) => {
    const customDate = new Date(date);
    customDate.setHours(time.hours, time.minutes, time.seconds);

    // Convert to 12-hour format if AM/PM
    let hours = customDate.getHours();
    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    customDate.setHours(hours);

    return customDate.toISOString(); // Return ISO format
  };

  // Function to format the time to hh:mm:ss format
  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    let ampm = "PM";
    let formattedHours = hours;
    if (hours >= 12) {
      ampm = "PM";
      if (hours > 12) formattedHours = (hours - 12).toString().padStart(2, "0");
    } else if (hours == 0) {
      formattedHours = "12";
    }

    return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleStatusChange = (isbn, newStatus, book) => {
    if (newStatus === "Approved") {
      setSelectedBook(book);
      setShowForm(true); // Show the form for issuing the book
    } else {
      updateBookStatus(isbn, newStatus); // Update status for rejected or pending
    }
    toast.success(
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4caf50" }}>
        ✅ Status updated to {newStatus}!
      </div>,
      { position: "top-center", autoClose: 3000 }
    );
    setOpenStatus(null); // Close dropdown
  };

  // Function to compare the current time with the due date
  const isOverdue = (dueDate) => {
    const currentDate = new Date();
    const due = new Date(dueDate);

    // Ensure we're comparing both dates in UTC to avoid timezone issues
    const currentDateUTC = new Date(currentDate.toISOString());
    const dueDateUTC = new Date(due.toISOString());

    return dueDateUTC < currentDateUTC; // Compare the dates
  };

  const handleSubmit = () => {
    if (!dueDate) {
      toast.error("Please select a due date.");
      return;
    }

    // Check if the dueDate is overdue
    if (isOverdue(dueDate)) {
      toast.warn("The due date has passed. Status will be set to 'Overdue'.");
      updateBookStatus(selectedBook.isbn, "Overdue", { issueDate, dueDate }); // Update status to overdue
    } else {
      // Format the time for both issueDate and dueDate
      const formattedIssueDate = formatTime(issueDate);
      const formattedDueDate = formatTime(dueDate);

      toast.success("Book issued successfully!");
      setShowForm(false); // Hide the form after submission
      // Update the book status and issue dates
      updateBookStatus(selectedBook.isbn, "Issued", { issueDate: formattedIssueDate, dueDate: formattedDueDate });
    }
  };

  const handleButtonClick = (isbn) => {
    if (openStatus === isbn) {
      setOpenStatus(null); // Close dropdown if clicked again
    } else {
      setOpenStatus(isbn); // Open dropdown
      const buttonRect = statusButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY, // Position below the button
        left: buttonRect.left + window.scrollX, // Position aligned with button
      });
    }
  };

  // Automatically set issueDate to current date and time
  const setIssueDateTime = () => {
    const currentDate = new Date();
    setIssueDate(currentDate.toISOString()); // Set current time to issueDate in ISO format
  };

  // Set Due Date based on custom time values
  const setDueDateFromTime = () => {
    const customDueDate = new Date();
    customDueDate.setFullYear(dueTime.year);
    customDueDate.setMonth(dueTime.month - 1); // Month is 0-indexed
    customDueDate.setDate(dueTime.day);
    customDueDate.setHours(dueTime.hours);
    customDueDate.setMinutes(dueTime.minutes);
    customDueDate.setSeconds(dueTime.seconds);
    customDueDate.setMilliseconds(0);
    setDueDate(customDueDate);
  };

  useEffect(() => {
    setDueDateFromTime(); // Update due date on dueTime change
  }, [dueTime]);

  return (
    <div className="issue-book">
      <h2>Issue Book Dashboard</h2>
      {requestedBooks.length === 0 ? (
        <p>No books requested for issue yet.</p>
      ) : (
        <div className="issue-books-display">
          <div className="issue-books-header">
            <p>Cover</p>
            <p>Title</p>
            <p>ISBN</p>
            <p>Status</p>
            <p>Issue Date</p>
            <p>Due Date</p>
            <p>Student Name</p>
            <p>Email</p>
          </div>
          <hr />
          {requestedBooks.map((book, index) => (
            <div key={index}>
              <div className="issue-books-item issue-books-header">
                {book.cover_id ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    alt={book.title}
                    className="issue-books-cover"
                  />
                ) : (
                  <div className="no-cover">No Image Available</div>
                )}
                <p>{book.title}</p>
                <p>{book.isbn}</p>
                <button
                  ref={statusButtonRef}
                  className={`status-button ${book.status?.toLowerCase() || "default-status"}`}
                  onClick={() => handleButtonClick(book.isbn)}
                >
                  {book.status}
                </button>
                {openStatus === book.isbn && (
                  <div
                    className="status-dropdown"
                    style={{
                      top: `${dropdownPosition.top}px`,
                      left: `${dropdownPosition.left}px`,
                    }}
                  >
                    <button
                      className="status-option"
                      onClick={() => handleStatusChange(book.isbn, "Approved", book)}
                    >
                      Approve
                    </button>
                    <button
                      className="status-option"
                      onClick={() => handleStatusChange(book.isbn, "Rejected", book)}
                    >
                      Reject
                    </button>
                    <button
                      className="status-option"
                      onClick={() => handleStatusChange(book.isbn, "Pending", book)}
                    >
                      Pending
                    </button>
                  </div>
                )}
                <p>{book.issueDate ? formatTime(book.issueDate) : "N/A"}</p>
                <p>{book.dueDate ? formatTime(book.dueDate) : "N/A"}</p>
                <p>{book.studentName || "N/A"}</p>
                <p>{book.studentEmail || "N/A"}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      {showForm && selectedBook && (
        <div className="issue-form">
          <h3>Issue Book Form</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Student Name</label>
              <input
                type="text"
                value={selectedBook.studentName}
                readOnly
                placeholder="Ram"
              />
            </div>
            <div>
              <label>Student Email</label>
              <input
                type="email"
                value={selectedBook.studentEmail}
                readOnly
                placeholder="prasad"
              />
            </div>
            <div>
              <label>Book ISBN</label>
              <input type="text" value={selectedBook.isbn} readOnly />
            </div>
            <div>
              <label>Issue Date</label>
              <input
                type="text"
                value={issueDate ? formatTime(issueDate) : "N/A"}
                readOnly
              />
            </div>
            <div>
              <label>Due Date</label>
              <input
                type="number"
                value={dueTime.day}
                onChange={(e) => setDueTime({ ...dueTime, day: e.target.value })}
                placeholder="Day"
              />
              <input
                type="number"
                value={dueTime.month}
                onChange={(e) => setDueTime({ ...dueTime, month: e.target.value })}
                placeholder="Month"
              />
              <input
                type="number"
                value={dueTime.year}
                onChange={(e) => setDueTime({ ...dueTime, year: e.target.value })}
                placeholder="Year"
              />
              <input
                type="number"
                value={dueTime.hours}
                onChange={(e) => setDueTime({ ...dueTime, hours: e.target.value })}
                placeholder="Hour"
              />
              <input
                type="number"
                value={dueTime.minutes}
                onChange={(e) => setDueTime({ ...dueTime, minutes: e.target.value })}
                placeholder="Minute"
              />
              <input
                type="number"
                value={dueTime.seconds}
                onChange={(e) => setDueTime({ ...dueTime, seconds: e.target.value })}
                placeholder="Second"
              />
              <select
                value={dueTime.ampm}
                onChange={(e) => setDueTime({ ...dueTime, ampm: e.target.value })}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <button onClick={handleSubmit}>Issue Book</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueBook;
