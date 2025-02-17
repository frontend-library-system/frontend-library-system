import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import {
  FaUser,
  FaGripfire,
  FaHeart,
  FaCogs,
  FaDownload,
} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import "./Sidebar.css";
import { GoPaperAirplane, GoPersonAdd } from "react-icons/go";
import { MdCardMembership, MdLibraryAdd } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  //testing
  const { user } = useAuth(); // Access user from AuthContext

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Toggle Button */}
      <div className="toggle" onClick={toggleSidebar}>
        <span className={`top_line common ${isOpen ? "rotate45" : ""}`}></span>
        <span className={`middle_line common ${isOpen ? "hidden" : ""}`}></span>
        <span
          className={`bottom_line common ${isOpen ? "rotateMinus45" : ""}`}
        ></span>
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`slide ${isOpen ? "show" : ""}`}>
        <h1 className="ganducolor">Pustak Prabandha</h1>
        <ul>
          {/* Admin-only links */}
          {user && user.role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard" activeClassName="active-link1">
                  <RiDashboardHorizontalFill className="icon1" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" activeClassName="active-link1">
                  <FaCogs className="icon1" />
                  Settings
                </NavLink>
              </li>
              {/* //change to admin user only and place it over there up */}
              
              <li>
                <NavLink to="/dashboard/addbook" activeClassName="active-link1">
                  <MdLibraryAdd  className="icon1" />
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/newbooks" activeClassName="active-link1">
                  <FaGripfire className="icon1" />
                  New Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addmember"
                  activeClassName="active-link1"
                >
                  <GoPersonAdd className="icon1" />
                  Add Member
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/newmembers"
                  activeClassName="active-link1"
                >
                  <MdCardMembership  className="icon1" />
                   Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/issuebooks"
                  activeClassName="active-link1"
                >
                  <GoPaperAirplane  className="icon1" />
                   IssueBooks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/newmembers"
                  activeClassName="active-link1"
                >
                  <MdCardMembership  className="icon1" />
                   Members
                </NavLink>
              </li>
              {/* //change to admin user only and place it over there up */}
              
            </>
          )}
          {/* Common links for all users and also appears to admin */}
          <li>
            <NavLink to="/profile" activeClassName="active-link1">
              <FaUser className="icon1" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" activeClassName="active-link1">
              <AiOutlineLogout className="icon1" />
              Logout
            </NavLink>
          </li>

          {/* Links for all users and also appears to admin */}
          <li>
            <NavLink to="/myfavourites" activeClassName="active-link1">
              <FaHeart className="icon1" />
              Saved
            </NavLink>
          </li>
          <li>
            <NavLink to="/mylibrary" activeClassName="active-link1">
              <IoLibrary className="icon1" />
              My Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/downloads" activeClassName="active-link1">
              <FaDownload className="icon1" />
              Downloads
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
