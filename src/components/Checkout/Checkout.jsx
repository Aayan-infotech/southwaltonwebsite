  // import React, { useState, useCallback, useEffect, useRef } from 'react';
  // import './Checkout.scss';
  // import Checkout1 from '../Checkout1/Checkout1';
  // import { useNavigate } from 'react-router-dom';
  // import { Autocomplete, useLoadScript } from '@react-google-maps/api';
  // import axios from 'axios';

  // const libraries = ['places'];

  // const BookingForm = () => {
  //   const [formData, setFormData] = useState({
  //     bname: '',
  //     bphone: '',
  //     vehiclesId:'',
  //     bemail: '',
  //     bsize: '',
  //     baddress: '',
  //     baddressh: '',
  //     bdrop: '',
  //     bpickup: '',
  //     startDate: '',
  //     endDate: '',
  //     drivers: [{
  //       name: '',
  //       phone: '',
  //       email: '',
  //       license: null,
  //       insurance: null,
  //       experience: ''
  //     }]
  //   });

  //   const navigate = useNavigate();
  //   const { isLoaded, loadError } = useLoadScript({
  //     googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M',
  //     libraries,
  //   });  

  //   const deliveryRef = useRef(null);
  //   const pickupRef = useRef(null);

  //   const getSize = async () => {
  //     try {
  //       const vehicleId = localStorage.getItem('vehicleId');
  //       if (!vehicleId) {
  //         console.error('Vehicle ID not found in local storage');
  //         return;
  //       }

  //       const response = await axios.get(`http://18.209.197.35 :5001/api/vehicle/vehicles/${vehicleId}`);
  //       const data = response.data;
  //       console.log('API response data:', data); // Verify the data structure
  //       setFormData(prevData => ({
  //         ...prevData,
  //         vehiclesId: vehicleId,
  //         bsize: data.vseats
          
  //       }));
  //     } catch (error) {
  //       console.log("Error fetching vehicle details", error);
  //     }
  //   };

  //   useEffect(() => {
  //     getSize();
  //   }, []);

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleDriverChange = (index, e) => {
  //     const { name, value } = e.target;
  //     const updatedDrivers = [...formData.drivers];
  //     updatedDrivers[index][name] = value;
  //     setFormData({
  //       ...formData,
  //       drivers: updatedDrivers
  //     });
  //   };

  //   const addDriver = () => {
  //     setFormData({
  //       ...formData,
  //       drivers: [...formData.drivers, {
  //         name: '',
  //         phone: '',
  //         email: '',
  //         license: null,
  //         insurance: null,
  //         experience: ''
  //       }]
  //     });
  //   };

  //   const removeDriver = (index) => {
  //     const updatedDrivers = formData.drivers.filter((_, i) => i !== index);
  //     setFormData({
  //       ...formData,
  //       drivers: updatedDrivers
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch('http://18.209.197.35 :5001/api/book/create', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formData)
  //       });

  //       if (response.ok) {
  //         const result = await response.json();  // Parse the response JSON to get the ID
  //         console.log('bookid ',result.id);
          
  //         localStorage.setItem('bookFormId', result.id);
  //         navigate('/agreement');
  //       } else {
  //         console.error('Failed to save booking data');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   const handlePlaceChanged = useCallback((field, ref) => {
  //     if (ref.current) {
  //       const place = ref.current.getPlace();
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         [field]: place.formatted_address || place.name, // Use formatted_address or name
  //       }));
  //     }
  //   }, []);

  //   if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  //   if (!isLoaded) return <div>Loading Maps...</div>;

  //   return (
  //     <>
  //       <form className="booking-form" onSubmit={handleSubmit}>
  //         <h1>Enter Your Booking Details</h1>


  //         <div className="form-grid">
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-person"></i> Name</label>
  //             <input type="text" name="bname" placeholder="Enter Your Name" value={formData.bname} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-phone"></i> Phone Number</label>
  //             <input type="text" name="bphone" placeholder="Enter Phone Number" value={formData.bphone} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-envelope"></i> Email</label>
  //             <input type="email" name="bemail" placeholder="Enter Email Address" value={formData.bemail} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-cart-shopping"></i> Size of Cart</label>
  //             <input type="text" name="bsize" placeholder="Enter Cart Size" value={formData.bsize} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-house"></i> Rental Address</label>
  //             <input type="text" name="baddress" placeholder="Enter Rental Address" value={formData.baddress} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label><i className="fa-solid fa-house"></i> Home Address</label>
  //             <input type="text" name="baddressh" placeholder="Enter Home Address" value={formData.baddressh} onChange={handleInputChange} />
  //           </div>
  //         </div>

  //         <div className="drivers-section">
  //           {formData.drivers.map((driver, index) => (
  //             <div key={index} className="driver-details">
  //               <div className="form-grid">
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-person"></i> Name</label>
  //                   <input type="text" name="name" placeholder="Enter Driver Name" value={driver.name} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-phone"></i> Phone Number</label>
  //                   <input type="text" name="phone" placeholder="Enter Phone Number" value={driver.phone} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-envelope"></i> Email</label>
  //                   <input type="email" name="email" placeholder="Enter Email Address" value={driver.email} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-id-card"></i> License</label>
  //                   <input type="file" name="license" onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-shield-alt"></i> Insurance</label>
  //                   <input type="file" name="insurance" onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //                 <div className="form-group">
  //                   <label><i className="fa-solid fa-clock"></i> Experience</label>
  //                   <input type="text" name="experience" placeholder="Enter Driving Experience" value={driver.experience} onChange={(e) => handleDriverChange(index, e)} />
  //                 </div>
  //               </div>
  //               <button type="button" onClick={() => removeDriver(index)}  className="remove-driver" >Remove Driver</button>
  //             </div>
  //           ))}
  //           <button type="button"className="add-driver" onClick={addDriver}>Add Driver</button>
  //         </div>
  //           <div className="checkout-button">
  //           <button type="submit"  className="submit-check">Submit</button>
  //           </div>

          
  //       </form>
  //     </>
  //   );
  // };

  // export default BookingForm;
  import React, { useState, useEffect } from 'react';
  import './Checkout.scss';
  import { useNavigate, useLocation } from 'react-router-dom';
  import axios from 'axios';
  
  const BookingForm = () => {
    const [formData, setFormData] = useState({
      bname: '',
      bphone: '',
      vehiclesId: '',
      bemail: '',
      bsize: '',
      baddress: '',
      baddressh: '',
      drivers: [{
        dname: '',
        dphone: '',
        demail: '',
        dlicense: null,
        dpolicy: null,
        dexperience: ''
      }]
    });
  
    const [reservationId, setReservationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const navigate = useNavigate();
    const location = useLocation();
    const { season, day } = location.state || {};
  
    useEffect(() => {
      const id = localStorage.getItem('reservationId');
      if (id) {
        setReservationId(id); // Set the reservation ID into state
      }
    }, []);
  
    const getSize = async () => {
      try {
        const vehicleId = localStorage.getItem('vehicleId');
        if (!vehicleId) {
          console.error('Vehicle ID not found in local storage');
          return;
        }
  
        // Validate season and day before making the request
        if (!season || !day) {
          console.error('Season or day not specified in state');
          return;
        }
  
        // Include season and day in the API request
        const response = await axios.get(
          `http://18.209.197.35 :8132/api/vehicle/price/${vehicleId}?season=${season}&day=${day}`
        );
        const data = response.data;
  
        setFormData(prevData => ({
          ...prevData,
          vehiclesId: vehicleId,
          bsize: data.passenger
        }));
      } catch (error) {
        console.log('Error fetching vehicle details', error);
      }
    };
  
    useEffect(() => {
      getSize();
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleDriverChange = (index, e) => {
      const { name, value } = e.target;
      const updatedDrivers = [...formData.drivers];
      updatedDrivers[index][name] = value;
      setFormData({
        ...formData,
        drivers: updatedDrivers
      });
    };
  
    const handleFileChange = (index, fileType, event) => {
      const file = event.target.files[0];
      if (file) {
        const newDrivers = [...formData.drivers];
        newDrivers[index][fileType] = file;
        setFormData({ ...formData, drivers: newDrivers });
      }
    };
  
    const addDriver = () => {
      setFormData({
        ...formData,
        drivers: [...formData.drivers, {
          dname: '',
          dphone: '',
          demail: '',
          dlicense: null,
          dpolicy: null,
          dexperience: ''
        }]
      });
    };
  
    const removeDriver = (index) => {
      const updatedDrivers = formData.drivers.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        drivers: updatedDrivers
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
  
      const formDataToSubmit = new FormData();
  
      // Append booking details
      formDataToSubmit.append('bname', formData.bname);
      formDataToSubmit.append('bphone', formData.bphone);
      formDataToSubmit.append('bemail', formData.bemail);
      formDataToSubmit.append('bsize', formData.bsize);
      formDataToSubmit.append('baddress', formData.baddress);
      formDataToSubmit.append('baddressh', formData.baddressh);
  
      // Convert drivers array to JSON string and append
      const driversPayload = formData.drivers.map((driver) => ({
        dname: driver.dname,
        dphone: driver.dphone,
        demail: driver.demail,
        dexperience: driver.dexperience,
      }));
      formDataToSubmit.append('customerDrivers', JSON.stringify(driversPayload));
  
      // Append files (policy and license)
      formData.drivers.forEach((driver) => {
        if (driver.dpolicy) {
          formDataToSubmit.append('dpolicy', driver.dpolicy); // Binary file for policy
        }
        if (driver.dlicense) {
          formDataToSubmit.append('dlicense', driver.dlicense); // Binary file for license
        }
      });
  
      try {
        const response = await axios.post('http://18.209.197.35 :5001/api/book/create', formDataToSubmit, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setLoading(false);
        localStorage.setItem('bookFormId', response.data.bookingId);
        setSuccessMessage(response.data.message);
        navigate('/agreement'); // Redirect to a success page (example)
      } catch (err) {
        setLoading(false);
        setErrorMessage(err.response ? err.response.data.message : 'Something went wrong.');
      }
    };
  
    return (
      <form className="booking-form" onSubmit={handleSubmit}>
        <h1>Enter Your Booking Details</h1>
  
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
  
        <div className="form-grid">
          <div className="form-group">
            <label><i className="fa-solid fa-person"></i> Name</label>
            <input type="text" name="bname" placeholder="Enter Your Name" value={formData.bname} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label><i className="fa-solid fa-phone"></i> Phone Number</label>
            <input type="text" name="bphone" placeholder="Enter Phone Number" value={formData.bphone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label><i className="fa-solid fa-envelope"></i> Email</label>
            <input type="email" name="bemail" placeholder="Enter Email Address" value={formData.bemail} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label><i className="fa-solid fa-cart-shopping"></i> Size of Cart</label>
            <input type="text" name="bsize" placeholder="Enter Cart Size" value={formData.bsize} onChange={handleInputChange} readOnly />
          </div>
          <div className="form-group">
            <label><i className="fa-solid fa-house"></i> Rental Address</label>
            <input type="text" name="baddress" placeholder="Enter Rental Address" value={formData.baddress} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label><i className="fa-solid fa-house"></i> Home Address</label>
            <input type="text" name="baddressh" placeholder="Enter Home Address" value={formData.baddressh} onChange={handleInputChange} />
          </div>
        </div>
  
        <div className="drivers-section">
          {formData.drivers.map((driver, index) => (
            <div key={index} className="driver-details">
              <div className="form-grid">
                <div className="form-group">
                  <label><i className="fa-solid fa-person"></i> Driver Name</label>
                  <input type="text" name="dname" placeholder="Enter Driver Name" value={driver.dname} onChange={(e) => handleDriverChange(index, e)} />
                </div>
                <div className="form-group">
                  <label><i className="fa-solid fa-phone"></i> Phone Number</label>
                  <input type="text" name="dphone" placeholder="Enter Phone Number" value={driver.dphone} onChange={(e) => handleDriverChange(index, e)} />
                </div>
                <div className="form-group">
                  <label><i className="fa-solid fa-envelope"></i> Email</label>
                  <input type="email" name="demail" placeholder="Enter Email Address" value={driver.demail} onChange={(e) => handleDriverChange(index, e)} />
                </div>
                <div className="form-group">
                  <label><i className="fa-solid fa-id-card"></i> License</label>
                  <input type="file" onChange={(e) => handleFileChange(index, 'dlicense', e)} />
                </div>
                <div className="form-group">
                  <label><i className="fa-solid fa-id-card"></i> Policy</label>
                  <input type="file" onChange={(e) => handleFileChange(index, 'dpolicy', e)} />
                </div>
                <div className="form-group">
                  <label><i className="fa-solid fa-trophy"></i> Experience</label>
                  <input type="text" name="dexperience" placeholder="Enter Experience" value={driver.dexperience} onChange={(e) => handleDriverChange(index, e)} />
                </div>
              </div>
  
              {/* <button type="button" className="remove-driver" onClick={() => removeDriver(index)}>Remove Driver</button> */}
            </div>
          ))}
  
          {/* <button type="button" className="add-driver" onClick={addDriver}>Add Driver</button> */}
        </div>
   <div className="checkout-button">
   <button type="submit" className="submit-button submit-check" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
   </div>
        
      </form>
    );
  };
  
  export default BookingForm;
  