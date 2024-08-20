import React from 'react';
import './PaymentType.scss';
import { Link } from 'react-router-dom';


const PaymentForm = () => {
    return (
        <div className="payment-form-container">
            <form className="payment-form">
                <div className="form-group">
                <label htmlFor="amount">Payment</label>
                    <div class="dropdown">
                        <button class="dropbtn">Type</button>
                        <div class="dropdown-content">
                            <a href="#">Credit Card</a>
                            <a href="#">Debit Crad</a>
                            <a href="#">Pay pal</a>
                            <a href="#">cash</a>
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" name="amount" placeholder="Enter amount" />
                </div>
                <div className="payment-button">
                    <Link to='/payment' style={{textDecoration:"none"}}>
                    <button type="submit">Next</button>

                    </Link>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;
