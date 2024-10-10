import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccessfully.scss';
import payment from './img/payment.png'; // Path to your check icon image
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetails = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { transactionId } = location.state || {}; // Extract transactionId from location state


  const fetchUserDetails = async () => {
    const userId = localStorage.getItem('user');
    if (!userId) {
      setError("User Id not found")
      setLoading(false)
      return;
    }
    console.log(userId);
    try {

      const response = await axios.get(`http://localhost:5001/api/user/${userId}`);
      console.log('response', response);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setPhone(response.data.data.phoneNumber);
    }
    catch (error) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details');
    }
  }
  const fetchVehicleDetails = async () => {

    const vehicle = localStorage.getItem('vehicleId');
    if (!vehicle) {
      setError('Vehicle not found')
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/vehicle/vehicles/${vehicle}`)
      setPrice(response.data.vprice);
      console.log(response);
      
    }
    catch (error) {
      console.error('Error fetching vehicle details:', err);
      setError('Failed to fetch vehicle details');
    }

  }

  useEffect(() => {
    fetchUserDetails();
    fetchVehicleDetails()
  }, [])

  return (
    <div className="invoice-container">
      <div className="icon-section">
        <img src={payment} alt="Success" />
      </div>
      <div className="details-section">
        <p><strong>Payment Method</strong> : Net Banking</p>
        <p><strong>Payment Type</strong> : Stripe</p>
        {/* <p><strong>Bank</strong> : HDFC</p> */}
        <p><strong>Mobile</strong> : {phone}</p>
        <p><strong>Email</strong> : {email}</p>
        <p><strong>Amount Paid</strong> : ${price}</p>
        <p><strong>Transaction ID</strong> : {transactionId || 'N/A'}</p>
        {/* <Link to='/agreement'>
          <button className="invoice-button"><i className="fa-solid fa-file-invoice"></i> Invoice</button>
        </Link> */}
      </div>
    </div>
    );
  };

export default InvoiceDetails;
