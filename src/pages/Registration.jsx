



//this one is for signup 
// import "./Registration.css";


//* Registration Form Using Multiple State Variables

//todo  Tasks:

//? Set up a functional component in React.
//? Create five separate state variables (firstName, lastName, email, password, phoneNumber).
//? Create input fields for each piece of information.
//? Implement onChange handlers to update state variables.
//? Discuss the benefits and drawbacks of this approach.

import { NavLink } from "react-router-dom";
import "./Registration.css";
import { useState } from "react";

export const RegistrationForm = () => {



    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
    });


// instead of using this five state , use like aboveway  one state     
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setUser((prev)=> ({ ...prev, [name]:value }));

  };
    // switch (name) {
    //   case "firstName":
    //     setFirstName(value);
    //     break;

    //   case "lastName":
    //     setLastName(value);
    //     break;

    //   case "email":
    //     setEmail(value);
    //     break;

    //   case "password":
    //     setPassword(value);
    //     break;

    //   case "phone":
    //     setPhoneNumber(value);
    //     break;
    // }
//   };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   phoneNumber,
    ...user //  using spread operator to get all user data
    };

    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="containerone">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>

          <label htmlFor="firstName">
            <b>First Name</b>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter firstName"
            required
            value={user.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="lastName">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter lastName"
            required
            value={user.lastName}
            onChange={handleInputChange}
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            value={user.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={user.password}
            onChange={handleInputChange}
          />

          <label htmlFor="phone">
            <b>Phone Number</b>
          </label>

          <input
            type="phone"
            name="phoneNumber"
            placeholder="9876543211"
            required
            value={user.phoneNumber}
            onChange={handleInputChange}
          />

          <p style={{fontSize: "12px"}}>
            By creating an account you agree to our
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms & Privacy
            </a>
          </p>
          <p style={{fontSize: "12px"}}>
            Already have an account?
            <NavLink to='/signin' style={{ color: "dodgerblue", textDecoration: "none"}} > Login</NavLink>

          </p>

          <div className="clearfix">
            <button type="submit" className="btn">
              Sign Up
            </button>
          </div>
        </div>
      </form>

      <section
        className="summary"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <p>
          Hello, my name is
          <span>
            {user.firstName} {user.lastName}
          </span>
          . My email address is <span>{user.email}</span> and my phone number is
          <span>{user.phoneNumber}</span>.
        </p>
      </section>
    </>
  );
};