// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import homebg1 from './img/homebg1.png';
// import Group from './img/Group.png';
// import './Reserve.scss';

// const Reserve = () => {
//     const [vehicleDetails, setVehicleDetails] = useState(null);
//     const [reservationDates, setReservationDates] = useState(null);
//     const vehicleId = localStorage.getItem('vehicleId'); // assuming vehicleId is stored in localStorage
//     const reservationId = localStorage.getItem('reservationId'); // assuming reservationId is stored in localStorage

//     const navigate = useNavigate();

//     // Helper function to format dates
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-GB', {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric'
//         });
//     };

//     // Fetch vehicle details from API
//     useEffect(() => {
//         if (vehicleId) {
//             fetch(`http://44.196.192.232:5001/api/vehicle/vehicles/${vehicleId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     setVehicleDetails(data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching vehicle details:', error);
//                 });
//         }
//     }, [vehicleId]);

//     // Fetch reservation dates from API
//     useEffect(() => {
//         if (reservationId) {
//             fetch(`http://44.196.192.232:5001/api/reserve/reservation/${reservationId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     setReservationDates(data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching reservation dates:', error);
//                 });
//         }
//     }, [reservationId]);
//     const handleCheckoutClick = () => {
//         navigate('/checkout'); // Navigate to the checkout page
//     };
//     const price=((vehicleDetails.vprice)*(reservationDates.days))

//     return (
//         <div className='Reserve'>
//             <img className='aa' src={homebg1} alt="" />
//             <div className='week'>
//                 <div className='weekName'>
//                     <img src={vehicleDetails?.vimage || Group} alt="" />
//                 </div>
//                 <div className='week2'>
//                     <h3>
//                         {vehicleDetails?.vname || 'Vehicle Name'} 
//                         &nbsp;<span>{`${vehicleDetails?.vseats || '4'} Passengers`}</span>
//                     </h3>
//                     <h4>
//                         Price: <span>${price || '800'}</span>
//                     </h4>
                    
//                     <p>
//                         Start Date: <span>{reservationDates?.pickdate ? formatDate(reservationDates.pickdate) : '2 October 2024'}</span>
//                     </p>
                    
//                     <p>
//                         End Date: <span>{reservationDates?.dropdate ? formatDate(reservationDates.dropdate) : '5 October 2024'}</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='book'>
//                 <button onClick={handleCheckoutClick}>
//                     Request Booking
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Reserve;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import homebg1 from './img/homebg1.png';
import Group from './img/Group.png';
import './Reserve.scss';

const Reserve = () => {
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [reservationDates, setReservationDates] = useState(null);
    const vehicleId = localStorage.getItem('vehicleId'); // assuming vehicleId is stored in localStorage
    const reservationId = localStorage.getItem('reservationId'); // assuming reservationId is stored in localStorage

    const navigate = useNavigate();

    // Helper function to format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fetch vehicle details from API
    useEffect(() => {
        if (vehicleId) {
            fetch(`http://44.196.192.232:5001/api/vehicle/vehicles/${vehicleId}`)
                .then(response => response.json())
                .then(data => {
                    setVehicleDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching vehicle details:', error);
                });
        }
    }, [vehicleId]);

    // Fetch reservation dates from API
    useEffect(() => {
        if (reservationId) {
            fetch(`http://44.196.192.232:5001/api/reserve/reservation/${reservationId}`)
                .then(response => response.json())
                .then(data => {
                    setReservationDates(data);
                })
                .catch(error => {
                    console.error('Error fetching reservation dates:', error);
                });
        }
    }, [reservationId]);
    useEffect(() => {
        if (vehicleDetails && reservationDates) {
            const calculatedPrice = vehicleDetails.vprice * reservationDates.days;
            localStorage.setItem('price', calculatedPrice); // Store the calculated price in localStorage
        }
    }, [vehicleDetails, reservationDates]);

    const handleCheckoutClick = () => {
        navigate('/checkout'); // Navigate to the checkout page
    };

    // Calculate the price only if both vehicleDetails and reservationDates are available
    const price = localStorage.getItem('price') || '800';

    return (
        <div className='Reserve'>
            <img className='aa' src={homebg1} alt="" />
            <div className='week'>
                <div className='weekName'>
                    <img src={vehicleDetails?.vimage || Group} alt="" />
                </div>
                <div className='week2'>
                    <h3>
                        {vehicleDetails?.vname || 'Vehicle Name'} 
                        &nbsp;<span>{`${vehicleDetails?.vseats || '4'} Passengers`}</span>
                    </h3>
                    <h4>
                        Price: <span>${price}</span>
                    </h4>
                    
                    <p>
                        Start Date: <span>{reservationDates?.pickdate ? formatDate(reservationDates.pickdate) : '2 October 2024'}</span>
                    </p>
                    
                    <p>
                        End Date: <span>{reservationDates?.dropdate ? formatDate(reservationDates.dropdate) : '5 October 2024'}</span>
                    </p>
                </div>
            </div>
            <div className='book'>
                <button onClick={handleCheckoutClick}>
                    Request Booking
                </button>
            </div>
        </div>
    );
}

export default Reserve;
