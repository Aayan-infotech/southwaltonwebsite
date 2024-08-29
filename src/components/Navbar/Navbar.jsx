  import React, { useState } from 'react';
  import './Navbar.scss';
  import image1 from './img/image1.png'; // Adjust the path to your logo file
  import { Link, useNavigate } from 'react-router-dom';


  const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login'); // Redirect to login page
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const handleContactUs=()=>{
      navigate('/contact')
    }

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
          <Link to="/about">About Us</Link>
          <Link to="/cart">Cart</Link>

              {isLoggedIn ? (
                <button className="login-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to='/login'>
                    <button className="login-button">Login</button>
                  </Link>
                  <Link to='/sign-up'>
                    <button className="signup-button">Sign Up</button>
                  </Link>
                </>
              )}

          <button className="contact-button" onClick={handleContactUs}>Contact Us</button>
        </div>
      </nav>
    );
  };

  export default Navbar;
