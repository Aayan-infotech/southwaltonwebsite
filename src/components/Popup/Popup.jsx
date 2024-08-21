import React from 'react';
import './Popup.scss'; // Create a separate CSS file for popup styles

const Popup = ({ onClose, onBook }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>Cart Added!</p>
                <div className="popup-buttons">
                    <button onClick={onClose} className="popup-button">OK</button>
                    <button onClick={onBook} className="popup-button">Book</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
