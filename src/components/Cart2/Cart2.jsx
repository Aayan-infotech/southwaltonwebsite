// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Cart2.scss';
// import Group3 from './img/Group3.png';
// import Popup from '../Popup/Popup';
// import { useNavigate } from 'react-router-dom';


// const fetchVehicledata = async (setCardDetails, setError) => {
//   try {
//     const response = await axios.get('http://localhost:5001/api/vehicle/');
//     setCardDetails(response.data);
//   } catch (error) {
//     setError('Error fetching details');
//     console.log('Error fetching details:', error);
//   }
// };

// const changecartstatus = async(id, status) => {
//   try{
//     await axios.put(`http://localhost:5001/api/vehicle/changestatus/${id}`,{status})
//   }catch(error){
//     console.log('Error changing Status', error);
//   }
// }

// const StarRating = ({ rating, onRatingChange }) => {
//   return (
//     <div className="review-stars">
//       {[...Array(5)].map((star, index) => {
//         index += 1;
//         return (
//           <span
//             key={index}
//             className={index <= rating ? "on" : "off"}
//             onClick={() => onRatingChange(index)}
//           >
//             &#9733;
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// const Card = ({ image, passengers, model, price, id, status, }) => {
//   const [rating, setRating] = useState(0);
//   const imageUrl = image ? `http://localhost:5001/uploads/${image}` : Group3;
//   const history = useNavigate();
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const handleChooseClick = () => {
//     setPopupVisible(true);
//   };

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//   };

//   const handleBookClick = () => {
//     setPopupVisible(false);
//     history.push('/booking-page'); // Replace with your actual booking page route
//   };

//   return (
//     <div className="card-cart2">
//       <StarRating rating={rating} onRatingChange={setRating} />
//       <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
//       <div className="card-content">
//         <p className="passengers">{passengers} Passenger</p>
//         <div className="manage">
//           <h2 className="model">{model}</h2>
//           <p className="price">Price <span>$ {price}</span></p>
//         </div>
//         <button onClick={() =>{ changecartstatus(id, status),handleChooseClick}} className="choose-button">Choose this cart</button>
//       </div>
//     </div>
//   );
// };

// const CardList = ({ cardDetails }) => {
//   return (
//     <div className="card-list">
//       {cardDetails.length > 0 ? (
//         cardDetails.map((card, index) => (
//           <Card
//             key={index}
//             image={card.image}
//             passengers={card.vseats}
//             model={card.vname}
//             price={card.vprice}
//             id={card._id}
//             status={card.Addtocart}
//           />
//         ))
//       ) : (
//         <p>No vehicles available</p>
//       )}
//     </div>
//   );
// };

// const Cart2 = () => {
//   const [cardDetails, setCardDetails] = useState([]);
//   const [error, setError] = useState('');
//   const [showAll, setShowAll] = useState(false); // State for View More/View Less

//   useEffect(() => {
//     fetchVehicledata(setCardDetails, setError);
//   }, []);

//   const initialCardCount = 5; // Number of cards to display initially

//   const handleToggle = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <div className="App">
//       {error && <p className="error-message">{error}</p>}
//       <CardList cardDetails={showAll ? cardDetails : cardDetails.slice(0, initialCardCount)} />
//       <div className="btn">
//         <button className="see-all" onClick={handleToggle}>
//           {showAll ? 'View Less' : 'View More'} ➔
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart2;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Cart2.scss';
// import Group3 from './img/Group3.png';
// import Popup from '../Popup/Popup';
// import { useNavigate } from 'react-router-dom';

// const fetchVehicledata = async (setCardDetails, setError) => {
//   try {
//     const response = await axios.get('http://localhost:5001/api/vehicle/');
//     setCardDetails(response.data);
//   } catch (error) {
//     setError('Error fetching details');
//     console.log('Error fetching details:', error);
//   }
// };

// const changecartstatus = async (id, status) => {
//   try {
//     await axios.put(`http://localhost:5001/api/vehicle/changestatus/${id}`, { status });
//   } catch (error) {
//     console.log('Error changing Status', error);
//   }
// };

// // const StarRating = ({ rating, onRatingChange }) => {
// //   return (
// //     <div className="review-stars">
// //       {[...Array(5)].map((star, index) => {
// //         index += 1;
// //         return (
// //           <span
// //             key={index}
// //             className={index <= rating ? "on" : "off"}
// //             onClick={() => onRatingChange(index)}
// //           >
// //             &#9733;
// //           </span>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// const Card = ({ image, passengers, model, price, id, status }) => {
//   const [rating, setRating] = useState(0);
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const navigate = useNavigate();
//   const imageUrl = image ? `http://localhost:5001/uploads/${image}` : Group3;

//   const handleChooseClick = () => {
//     setPopupVisible(true);
//   };

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//   };

//   const handleBookClick = () => {
//     setPopupVisible(false);
//     navigate('/booking'); // Replace with your actual booking page route
//   };

//   return (
//     <div className="card-cart2">
//       {isPopupVisible && <Popup onClose={handlePopupClose} onBook={handleBookClick} />}
//       {/* <StarRating rating={rating} onRatingChange={setRating} /> */}
//       <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
//       <div className="card-content">
//         <p className="passengers">{passengers} Passenger</p>
//         <div className="manage">
//           <h2 className="model">{model}</h2>
//           <p className="price">Price <span>$ {price}</span></p>
//         </div>
//         <button
//           onClick={() => {
//             changecartstatus(id, status);
//             handleChooseClick();
//           }}
//           className="choose-button"
//         >
//           Choose this cart
//         </button>
//       </div>
//     </div>
//   );
// };

// const CardList = ({ cardDetails }) => {
//   return (
//     <div className="card-list">
//       {cardDetails.length > 0 ? (
//         cardDetails.map((card, index) => (
//           <Card
//             key={index}
//             image={card.image}
//             passengers={card.vseats}
//             model={card.vname}
//             price={card.vprice}
//             id={card._id}
//             status={card.Addtocart}
//           />
//         ))
//       ) : (
//         <p>No vehicles available</p>
//       )}
//     </div>
//   );
// };

// const Cart2 = () => {
//   const [cardDetails, setCardDetails] = useState([]);
//   const [error, setError] = useState('');
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     fetchVehicledata(setCardDetails, setError);
//   }, []);

//   const initialCardCount = 5; // Number of cards to display initially

//   const handleToggle = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <div className="App">
//       {error && <p className="error-message">{error}</p>}
//       <CardList cardDetails={showAll ? cardDetails : cardDetails.slice(0, initialCardCount)} />
//       <div className="btn">
//         <button className="see-all" onClick={handleToggle}>
//           {showAll ? 'View Less' : 'View More'} ➔
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart2;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart2.scss';
import Group3 from './img/Group3.png';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

const fetchVehicledata = async (setCardDetails, setError) => {
  try {
    const response = await axios.get('http://localhost:5001/api/vehicle/');
    setCardDetails(response.data);
  } catch (error) {
    setError('Error fetching details');
    console.log('Error fetching details:', error);
  }
};

const changecartstatus = async (id, status) => {
  try {
    await axios.put(`http://localhost:5001/api/vehicle/changestatus/${id}`, { status });
  } catch (error) {
    console.log('Error changing Status', error);
  }
};

const Card = ({ image, passengers, model, price, id, status, onChoose }) => {
  const imageUrl = image ? `http://localhost:5001/uploads/${image}` : Group3;

  return (
    <div className="card-cart2">
      <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
      <div className="card-content">
        <p className="passengers">{passengers} Passenger</p>
        <div className="manage">
          <h2 className="model">{model}</h2>
          <p className="price">Price <span>$ {price}</span></p>
        </div>
        <button
          onClick={() => onChoose(id, status)}
          className="choose-button"
        >
          Choose this cart
        </button>
      </div>
    </div>
  );
};

const CardList = ({ cardDetails, onChoose }) => {
  return (
    <div className="card-list">
      {cardDetails.length > 0 ? (
        cardDetails.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            passengers={card.vseats}
            model={card.vname}
            price={card.vprice}
            id={card._id}
            status={card.Addtocart}
            onChoose={onChoose}
          />
        ))
      ) : (
        <p>No vehicles available</p>
      )}
    </div>
  );
};

const Cart2 = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicledata(setCardDetails, setError);
  }, []);

  const initialCardCount = 5; // Number of cards to display initially

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleChoose = (id, status) => {
    changecartstatus(id, status);
    setSelectedCard(id);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleBookClick = () => {
    setPopupVisible(false);
    navigate('/booking'); // Replace with your actual booking page route
  };

  return (
    <div className="App">
      {error && <p className="error-message">{error}</p>}
      {isPopupVisible && <Popup onClose={handlePopupClose} onBook={handleBookClick} />}
      <CardList cardDetails={showAll ? cardDetails : cardDetails.slice(0, initialCardCount)} onChoose={handleChoose} />
      <div className="btn">
        <button className="see-all" onClick={handleToggle}>
          {showAll ? 'View Less' : 'View More'} ➔
        </button>
      </div>
    </div>
  );
};

export default Cart2;
