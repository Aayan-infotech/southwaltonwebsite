import React, { useState } from 'react';
import './Cart2.scss';
import Group3 from './img/Group3.png';

// Sample data for the cards
const cardData = [
  {
    image: Group3,
    passengers: 4,
    model: 'Gas Model',
    price: 800
  },
  {
    image: Group3,
    passengers: 6,
    model: 'Gas Model',
    price: 1200
  },
  {
    image: Group3,
    passengers: 8,
    model: 'E.L. Model',
    price: 1800
  },
  {
    image: Group3,
    passengers: 4,
    model: 'E.L. Model',
    price: 900
  },
  {
    image: Group3,
    passengers: 6,
    model: 'Gas Model',
    price: 1000
  },
  {
    image: Group3,
    passengers: 8,
    model: 'E.U. Model',
    price: 1500
  },
];

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="review-stars">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => onRatingChange(index)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

const Card = ({ image, passengers, model, price }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="card-cart2">
      <StarRating rating={rating} onRatingChange={setRating} />
      <img src={image} alt={`${model} image`} className="card-image" />
      <div className="card-content">
        <p className="passengers">{passengers} Passenger</p>
        <div className="manage">
          <h2 className="model">{model}</h2>
          <p className="price">Price <span>$ {price}</span></p>
        </div>
        <button className="choose-button">Choose this cart</button>
      </div>
    </div>
  );
};

const CardList = () => {
  return (
    <div className="card-list">
      {cardData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          passengers={card.passengers}
          model={card.model}
          price={card.price}
        />
      ))}
    </div>
  );
};

const Cart2 = () => {
  return (
    <div className="App">
      <CardList />
      <div className="btn">
        <button className="see-all">View More ➔</button>
      </div>
    </div>
  );
};

export default Cart2;
