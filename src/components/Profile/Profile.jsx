import React from 'react';
import './Profile.scss';
import Upload from "./img/Upload.png"
import Upload1 from './img/Upload1.png'

const ProfileUpdate = () => {
  return (
    <div className="profile-update">
      <div className="profile1">
        <div className="image-section">
          <img src={Upload} alt="Profile" />
        </div>
        <div className="field-section">
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="text"><i className="fa-solid fa-person"></i> Full Name </label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="text"><i className="fa-solid fa-envelope"></i> Email</label>
              <input type="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="text"><i className="fa-solid fa-phone"></i> Phone Number</label>
              <input type="tel" placeholder="Enter Phone Number" />
            </div>
            <div className="form-group">
              <label htmlFor="text"><i className="fa-solid fa-location-dot"></i> State</label>
              <input type="text" placeholder="Enter your state" />
            </div>
          </form>
          <div className="button-profile">
            <button>Cancel</button>
            <button>Save</button>
          </div>
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
              <label htmlFor="text"><i className="fa-solid fa-lock"></i> Current Password </label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="text"><i className="fa-solid fa-lock"></i> New Password </label>
              <input type="email" placeholder="Enter email" />
            </div>
           
          </form>
          <div className="button-profile">
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default ProfileUpdate;
