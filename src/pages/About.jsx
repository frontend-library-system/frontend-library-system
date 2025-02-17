import React from "react";
import { NavLink } from "react-router-dom";
import "./About.css";

export const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* About Section (Top) */}
        <div className="about-section about-top card">
          <h1 className="about-title">About Pustak Prabandha</h1>
          <p>
            Pustak Prabandha is a modern digital library management system designed to help you
            organize, manage, and explore your library with ease. Whether you're a student, educator,
            or book enthusiast, our platform provides a seamless experience for discovering and
            managing books.
          </p>
        </div>

        {/* First Row - Our Mission & Key Features */}
        <div className="about-row">
          <div className="about-section card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to make knowledge accessible to everyone by providing a user-friendly
              platform that simplifies library management. We aim to bridge the gap between traditional
              libraries and modern technology.
            </p>
          </div>
          <div className="about-section card">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>Search books by title, author, or ID.</li>
              <li>Efficiently manage your library's inventory.</li>
              <li>User-friendly interface for seamless navigation.</li>
              <li>Responsive design for use on any device.</li>
              <li>Secure and reliable data management.</li>
            </ul>
          </div>
        </div>

        {/* Second Row - Contact Us & Join Us */}
        <div className="about-row">
          <div className="about-section card">
            <h2>Contact Us</h2>
            <p>
              Have questions or need assistance? We're here to help! Reach out to us for any inquiries
              or feedback. Our team is always ready to support you.
            </p>
            <NavLink to="/contact" className="navlink1">
              <button className="cta-button">Contact Us</button>
            </NavLink>
          </div>
          <div className="about-section card">
            <h2>Join Us Today</h2>
            <p>
              Ready to explore the world of books? Join Pustak Prabandha today and take the first step
              towards efficient library management.
            </p>
            <NavLink to="/book1" className="navlink0">
              <button className="cta-button">Get Started</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
