import React, { useState, useEffect } from 'react';
import './Profile.scss';
import Upload from "./img/Upload.png";
import Upload1 from './img/Upload1.png';
import axios from 'axios';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    state: ''
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userStr = localStorage.getItem('user');
      const user = JSON.parse(userStr);
      setUser(user);
      console.log("user", user);

      if (user) {
        try {
          const response = await axios.get(`http://3.111.163.2:5001/api/user/${user}`);
          setUserData(response.data.data); // Set user data in state
          console.log("response", response.data.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);  // Empty dependency array means this runs once on component mount

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value, // Update the specific field in the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.put(`http://3.111.163.2:5001/api/user/${user}`, userData);
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="profile-update">
      <div className="profile1">
        <div className="image-section">
          <img src={Upload} alt="Profile" />
        </div>
        <div className="field-section">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                value={userData.fullName} // Display fetched data
                onChange={handleInputChange} 
                placeholder="Enter your full name" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
              <input 
                type="email" 
                id="email" 
                value={userData.email} // Display fetched data
                onChange={handleInputChange} 
                placeholder="Enter email" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                value={userData.phoneNumber} // Display fetched data
                onChange={handleInputChange} 
                placeholder="Enter Phone Number" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
              <input 
                type="text" 
                id="state" 
                value={userData.state} // Display fetched data
                placeholder="Enter your state" 
                onChange={handleInputChange} 
              />
            </div>
            <div className="button-profile">
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>

      <hr style={{ width: "90%" }} />

      <div className="profile2">
        <div className="image-section">
          <img src={Upload1} alt="Profile" />
        </div>
        <div className="field-section">
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
              <input 
                type="password" 
                id="currentPassword" 
                placeholder="Enter current password" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
              <input 
                type="password" 
                id="newPassword" 
                placeholder="Enter new password" 
              />
            </div>
            <div className="button-profile">
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
   