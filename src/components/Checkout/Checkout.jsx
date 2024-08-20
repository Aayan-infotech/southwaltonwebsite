// BookingForm.js
import React, { useState } from 'react';
import './Checkout.scss';
import Checkout1  from '../Checkout1/Checkout1'
import { Link } from 'react-router-dom';


const BookingForm = () => {
  const [drivers, setDrivers] = useState([{ name: '', phone: '', email: '', license: null, insurance: null, experience: '' }]);

  const addDriver = () => {
    setDrivers([...drivers, { name: '', phone: '', email: '', license: null, insurance: null, experience: '' }]);
  };

  const removeDriver = (index) => {
    const updatedDrivers = drivers.filter((_, i) => i !== index);
    setDrivers(updatedDrivers);
  };

  return (
    <>
    <form className="booking-form">
      <h1>Enter Your Booking Details</h1>
      <div className="form-grid">
        <div className="form-group">
          <label><i class="fa-solid fa-person"></i> Name</label>
          <input type="text" placeholder="Enter Your Name" />
        </div>
        <div className="form-group">
          <label><i class="fa-solid fa-phone"></i>  Phone Number</label>
          <input type="text" placeholder="Enter Phone Number" />
        </div>
        <div className="form-group">
          <label><i class="fa-solid fa-envelope"></i> Email</label>
          <input type="email" placeholder="Enter Email Address" />
        </div>
        <div className="form-group">
          <label><i class="fa-solid fa-cart-shopping"></i> Size of Cart</label>
          <input type="text" placeholder="Enter Cart Size" />
        </div>
        <div className="form-group">
          <label><i class="fa-solid fa-house"></i> Rental Address</label>
          <input type="text" placeholder="Enter Rental Address" />
        </div>
        <div className="form-group">
          <label><i class="fa-solid fa-house"></i> Home Address</label>
          <input type="text" placeholder="Enter Home Address" />
        </div>
      </div>
      <div className="drivers-section">
        {drivers.map((driver, index) => (
          <div key={index} className="driver-details">
            <div className="form-grid">
              <div className="form-group">
                <label><i class="fa-solid fa-person"></i>   Name</label>
                <input type="text" placeholder="Enter Driver Name" />
              </div>
              <div className="form-group">
                <label><i class="fa-solid fa-phone"></i> Phone Number</label>
                <input type="text" placeholder="Enter Phone Number" />
              </div>
              <div className="form-group">
                <label><i class="fa-solid fa-envelope"></i> Email</label>
                <input type="email" placeholder="Enter Email Address" />
              </div>
              <div className="form-group">
                <label><i class="fa-solid fa-address-book"></i> Driver License</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label><i class="fa-solid fa-address-book"></i> Insurance Policy</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label><i class="fa-solid fa-calendar-days"></i> Years of Experience</label>
                <input type="text" placeholder="Enter Driving Experience" />
              </div>
            </div>
            <button type="button" className="remove-driver" onClick={() => removeDriver(index)}><i class="fa-solid fa-minus"></i> Remove Driver</button>
          </div>
        ))}
      </div>
      <button type="button" className="add-driver" onClick={addDriver}><i class="fa-solid fa-plus"></i> Add Driver</button>
      <div className="form-group terms">
        <input type="checkbox" />
        <label>I acknowledge the Terms & Conditions</label>
      </div>
      <div className="checkout-button">
        <Link to='/payment-type' style={{textDecoration:"none"}}>
      <button type="submit" className="submit-check">Continue</button>
        </Link>
      </div>
    </form>
    <Checkout1 />
    </>
    
  );
};

export default BookingForm;
