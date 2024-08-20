import React from 'react';
import './Payment.scss';
import Card from './img/Card.png'; // Path to your card image
import { Link } from 'react-router-dom';


const PaymentForm = () => {
  return (
    <div className="payment-container">
      <div className="card-section">
        <img src={Card} alt="Credit Card" />
      </div>
      <div className="form-section">
        <label htmlFor="card-name">Card Name</label>
        <input type="text" id="card-name" placeholder="Card Name" />

        <label htmlFor="card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX" maxlength="16" />

        <div className="input-group">
          <div>
            <label htmlFor="expiry-date">Expiry Date</label>
            <input type="text" id="expiry-date" placeholder="MM/YY" maxlength="5" />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="CVV" maxlength="3" />
          </div>
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" />
            I agree to terms & conditions
          </label>
          <label>
            <input type="checkbox" />
            Save card details
          </label>
        </div>

        <Link to ='/payment-successfully'>
        <button type="submit">Pay</button>
        </Link>




      </div>
    </div>
  );
};

export default PaymentForm;
