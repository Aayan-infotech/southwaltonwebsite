// CombinedComponent.js
import React, { useState } from 'react';
import './Booking2.scss';
import car1 from './img/car1.png';
import { Link } from 'react-router-dom';


const CombinedComponent = () => {
  const [price, setPrice] = useState(0);
  const model = {
    id: 1,
    name: 'E.L Model',
    price: '$ 900',
    imageUrl: car1,
    passengers: 4,
    rating: 5
  };

  return (
    <div className="combined-container">
      <div className="price-range">
        <div className="price-range-header">
          <p>Price Range</p>
          <span>${price} - Max</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="booking2-btn">
         
          <button className="apply-btn">Apply</button>
         
        </div>
      </div>
      <div className="cart-model">
        <div key={model.id} className="cart-card">
          <img src={model.imageUrl} alt={model.name} className="cart-image" />
          <div className="cart-details">
            <div className="cart-passengers">{model.passengers} Passengers</div>
            <div className="cart-name">{model.name}</div>
            <div className="cart-price">Price {model.price}</div>
            <Link to='/Checkout'>
            <button className="continue-button">Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
