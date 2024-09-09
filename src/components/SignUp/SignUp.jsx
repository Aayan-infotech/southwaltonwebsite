import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUp.scss";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    const formData = {
      fullName,
      email,
      phoneNumber,
      state,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/auth/signUp', formData);
      console.log(response.data);
      navigate('/login'); // Navigate to the login page on successful signup
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter your state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><i className="fa-solid fa-lock"></i> New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword"><i className="fa-solid fa-lock"></i> Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-group button-signup">
          <button type="submit" className="submit-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default App;
