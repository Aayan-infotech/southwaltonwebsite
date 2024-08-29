import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import OR from './img/OR.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://3.111.163.2:5001/api/auth/login', formData);
      
      // Save token and user data to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data._id));
      
      alert('Login successful!');
      navigate('/home'); // Redirect to home or dashboard
    } catch (error) {
      console.error('There was an error logging in!', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"><i className="fa-solid fa-envelope" /> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><i className="fa-solid fa-lock" /> Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group remember-me">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="login-button">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="additional-options">
        <p>Not have any account? <Link to="/sign-up">Sign Up</Link></p>
        <img src={OR} alt="Or separator" />
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;
