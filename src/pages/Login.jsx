// src/pages/Login.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import "./Login.css";
import { toast } from "react-toastify";

export const Login = () => {
  const { login } = useAuth(); // Get login function from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Call login function from context
    login(username, password);

    // Redirect based on user role after login
    // If login is successful, navigate to Dashboard (for admin)
    if (username === 'admin' && password === 'password') {
      toast.success('logged in successfully as admin');
      navigate("/dashboard", { 
        state: {
          message: "login successfully as admin",
        }
      });  // Navigate to Dashboard after successful login
    } else {
      navigate("/profile", {
        state: {
          name: username,
          email: `${username}@example.com`, // Generate email based on username
          role: "User", // Hardcoded role for user
        },
      });
    }
  };

  return (
    <div className="containerone">
      <h2> Pustak Prabandha</h2>
      <div className="card">
        <h1> Login </h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <NavLink to="/signup" className="navlink">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};
