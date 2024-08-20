import React from 'react';
import './PaymentSuccessfully.scss';
import payment from './img/payment.png'; // Path to your check icon image
import { Link } from 'react-router-dom';


const InvoiceDetails = () => {
  return (
    <div className="invoice-container">
      <div className="icon-section">
        <img src={payment} alt="Success" />
      </div>
      <div className="details-section">
        <p><strong>Payment Method</strong> : Net Banking</p>
        <p><strong>Payment Type</strong> : Reservation</p>
        <p><strong>Bank</strong> : HDFC</p>
        <p><strong>Mobile</strong> : 98****78</p>
        <p><strong>Email</strong> : john****@gmail.com</p>
        <p><strong>Amount Paid</strong> : $1400</p>
        <p><strong>Transaction ID</strong> : 1456tljhuj7167</p>
        <Link to='/agreement'>
        <button className="invoice-button"><i class="fa-solid fa-file-invoice"></i> Invoice</button>
        </Link>
      </div>
    </div>
  );
};

export default InvoiceDetails;
