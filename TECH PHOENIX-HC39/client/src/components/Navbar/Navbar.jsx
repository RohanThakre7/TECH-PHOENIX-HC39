import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <img className="mentora-logo" src="./mentora.svg" />
          <strong>Mentora</strong>
        </Link>
        <div className="navbar-links-container">
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="auth-links">
            {isAuthenticated ? (
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="auth-link">
                  Login
                </Link>
                <Link to="/signup" className="auth-link">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
