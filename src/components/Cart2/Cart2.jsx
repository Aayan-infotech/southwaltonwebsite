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

// const Card = ({ image, passengers, model, price, id, status, onChoose }) => {
//   const imageUrl = image ? `${image}` : Group3;

//   return (
//     <div className="card-cart2">
//       <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
//       <div className="card-content">
//         <p className="passengers">{passengers} Passenger</p>
//         <div className="manage">
//           <h2 className="model">{model}</h2>
//           <p className="price">Price <span>$ {price}</span></p>
//         </div>
//         <button
//           onClick={() => onChoose(id, status)}
//           className="choose-button"
//         >
//           Choose this cart
//         </button>
//       </div>
//     </div>
//   );
// };

// const CardList = ({ cardDetails, onChoose }) => {
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
//             onChoose={onChoose}
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
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchVehicledata(setCardDetails, setError);
//   }, []);

//   const initialCardCount = 5; // Number of cards to display initially

//   const handleToggle = () => {
//     setShowAll(!showAll);
//   };

//   const handleChoose = (id, status) => {
//     changecartstatus(id, status);
//     setSelectedCard(id);
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
//     <div className="App">
//       {error && <p className="error-message">{error}</p>}
//       {isPopupVisible && <Popup onClose={handlePopupClose} onBook={handleBookClick} />}
//       <CardList cardDetails={showAll ? cardDetails : cardDetails.slice(0, initialCardCount)} onChoose={handleChoose} />
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

const determineSeason = (month) => {
    if (month >= 0 && month <= 2) return 'peakseason'; // Jan - March
    if (month >= 3 && month <= 8) return 'offseason';  // April - Sept
    return 'secondaryseason';                           // Oct - Dec
};

const calculateDayDifference = (pickupDate, dropoffDate) => {
    const dayDifference = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
    const dayWords = {
        1: 'oneDay',
        2: 'twoDay',
        3: 'threeDay',
        4: 'fourDay',
        5: 'fiveDay',
        6: 'sixDay',
        7: 'sevenDay',
    };
    return dayDifference <= 7 ? dayWords[dayDifference] || 'seven' : 'sevenDay';
};

const fetchVehicledata = async (season, day, setCardDetails, setError) => {
    try {
        const response = await axios.get('http://44.196.192.232:8132/api/vehicle/by-season-and-day', {
            params: { season, day },
        });
        if (response.data?.length > 0) {
            setCardDetails(response.data); 
        } else {
            setError('No vehicles available for the selected date and season.');
        }
    } catch (error) {
        setError('Error fetching vehicle details');
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
    const imageUrl = image ? `${image}` : Group3;
    return (
        <div className="card-cart2">
            <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
            <div className="card-content">
                <p className="passengers">{passengers}  </p>
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
                cardDetails.map((card, index) => {
                    const { image, passenger, vname, price, _id, Addtocart } = card;
                    return (
                        <Card
                            key={index}
                            image={image}
                            passengers={passenger}
                            model={vname}
                            price={price}
                            id={_id}
                            status={Addtocart}
                            onChoose={onChoose}
                        />
                    );
                })
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
    const [reservationDate, setReservationDate] = useState(null);
    const [season, setSeason] = useState('');  // New state for season
    const [day, setDay] = useState('');        // New state for day
    const navigate = useNavigate();

    useEffect(() => {
        const reservationId = localStorage.getItem('reservationId');
        if (reservationId) {
            axios.get(`http://localhost:5001/api/reserve/reservation/${reservationId}`)
                .then(response => {
                    const reservationData = response.data;
                    if (reservationData && reservationData.pickdate && reservationData.dropdate) {
                        const pickupDate = new Date(reservationData.pickdate);
                        const dropoffDate = new Date(reservationData.dropdate);
                        setReservationDate({ pickupDate, dropoffDate });
                    } else {
                        setError('Reservation data is missing pickdate or dropdate.');
                    }
                })
                .catch(err => {
                    setError('Error fetching reservation data');
                    console.log('Error fetching reservation data:', err);
                });
        } else {
            setError('No reservation ID found');
        }
    }, []);

    useEffect(() => {
        if (reservationDate) {
            const { pickupDate, dropoffDate } = reservationDate;
            const currentSeason = determineSeason(pickupDate.getMonth());
            const currentDay = calculateDayDifference(pickupDate, dropoffDate);
            setSeason(currentSeason);  // Set season in state
            setDay(currentDay);        // Set day in state
            fetchVehicledata(currentSeason, currentDay, setCardDetails, setError);
        }
    }, [reservationDate]);

    const initialCardCount = 5;
    const handleToggle = () => {
        setShowAll(!showAll);
    };

    const handleChoose = (id, status) => {
        localStorage.setItem('vehicleId', id);
        console.log('vehicleId',id);
        
        changecartstatus(id, status);
        setSelectedCard(id);
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    const handleBookClick = () => {
        const reserveId = localStorage.getItem('reservationId');
        const vehicleId = localStorage.getItem('vehicleId');
        if (reserveId) {
            setPopupVisible(false);
            navigate('/reserve', { state: { season, day ,vehicleId } });  // Use season and day from state
        } else {
            navigate('/home3');
        }
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
