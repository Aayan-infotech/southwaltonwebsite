import React, { useState, useRef, useEffect } from 'react';
import './HomeSection3.scss';

const CartDetails = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const deliveryRef = useRef(null);
    const pickupRef = useRef(null);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const handleIconClick = (ref) => {
        ref.current.click();
    };

    useEffect(() => {
        const initAutocomplete = () => {
            if (window.google && window.google.maps) {
                try {
                    const deliveryAutocomplete = new window.google.maps.places.Autocomplete(deliveryRef.current, {
                        types: ['address'],
                    });
                    deliveryAutocomplete.addListener('place_changed', () => {
                        const place = deliveryAutocomplete.getPlace();
                        setDeliveryLocation(place.formatted_address);
                    });

                    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, {
                        types: ['address'],
                    });
                    pickupAutocomplete.addListener('place_changed', () => {
                        const place = pickupAutocomplete.getPlace();
                        setPickupLocation(place.formatted_address);
                    });
                } catch (error) {
                    console.error('Error initializing Google Maps Autocomplete:', error);
                }
            } else {
                console.error('Google Maps API is not loaded');
            }
        };

        if (window.google && window.google.maps) {
            initAutocomplete();
        } else {
            console.error('Google Maps API is not loaded yet');
        }
    }, []);

    return (
        <>
            <div className="home3-header">
                <h1>CART DETAILS</h1>
            </div>
            <div className="home3-details">
                <div className="location-input">
                    <div className="input-wrapper">
                        <label><i className="fa-solid fa-location-dot"></i> Delivery</label>
                        <input
                            type="text"
                            placeholder="Enter Your Delivery Location"
                            ref={deliveryRef}
                            value={deliveryLocation}
                            onChange={(e) => setDeliveryLocation(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
                        <input
                            type="text"
                            placeholder="Enter Your Pickup Location"
                            ref={pickupRef}
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                        />
                    </div>
                </div>
                <div className="date-input">
                    <div className="date-wrapper">
                        <input
                            type="date"
                            className="date-box"
                            id="startDate"
                            ref={startDateRef}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="placeholder">
                            {startDate ? formatDate(startDate) : 'Start Date'}
                            <span className="icon" onClick={() => handleIconClick(startDateRef)}>
                                <i className="fa-regular fa-calendar-days"></i>
                            </span>
                        </span>
                    </div>
                    <div className="date-wrapper">
                        <input
                            type="date"
                            className="date-box"
                            id="endDate"
                            ref={endDateRef}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <span className="placeholder">
                            {endDate ? formatDate(endDate) : 'End Date'}
                            <span className="icon" onClick={() => handleIconClick(endDateRef)}>
                                <i className="fa-regular fa-calendar-days"></i>
                            </span>
                        </span>
                    </div>
                </div>
                
                <div className="homesection3">
                    <button className="search-btn">Submit</button>
                </div>
            </div>
        </>
    );
};

export default CartDetails;
