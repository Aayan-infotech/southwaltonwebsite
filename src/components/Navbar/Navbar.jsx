import React, { useState } from 'react';
import './Navbar.scss';
import image1 from './img/image1.png'; // Adjust the path to your logo file
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to='/'>
        <img src={image1} alt="Logo" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/about">About Us</a>
        <a href="/cart">Cart</a>
        
        <Link to ='/login'>
        <button className="login-button">Login</button>
        </Link>
        <Link to='/sign-up'>
        <button className="signup-button">Sign Up</button>
        </Link>
        {/* <div className="navbar-search">
          <input type="text" placeholder="Search                         🔍" />
        </div> */}
        <button className="contact-button">Contact Us</button>
      </div>
    </nav>
  );
};

export default Navbar;
