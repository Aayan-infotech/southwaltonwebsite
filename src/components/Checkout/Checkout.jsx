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

  //       const response = await axios.get(`http://44.196.192.232:5001/api/vehicle/vehicles/${vehicleId}`);
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
  //       const response = await fetch('http://44.196.192.232:5001/api/book/create', {
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
import { useNavigate } from 'react-router-dom';
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
   useEffect(() => {
    const id = localStorage.getItem('reservationId');
    if (id) {
      setReservationId(id);  // Set the reservation ID into state
    }
  }, []);


  const getSize = async () => {
    try {
      const vehicleId = localStorage.getItem('vehicleId');
      if (!vehicleId) {
        console.error('Vehicle ID not found in local storage');
        return;
      }

      const response = await axios.get(`http://44.196.192.232:8132/api/vehicle/vehicles/${vehicleId}`);
      const data = response.data;
      setFormData(prevData => ({
        ...prevData,
        vehiclesId: vehicleId,
        bsize: data.vseats
      }));
    } catch (error) {
      console.log("Error fetching vehicle details", error);
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
    setSuccessMessage('');
  
    const formDataToSend = new FormData();
  
    // Append the booking form data
    formDataToSend.append('bname', formData.bname);
    formDataToSend.append('bphone', formData.bphone);
    formDataToSend.append('bemail', formData.bemail);
    formDataToSend.append('bsize', formData.bsize);
    formDataToSend.append('baddress', formData.baddress);
    formDataToSend.append('baddressh', formData.baddressh);
    formDataToSend.append('vehiclesId', formData.vehiclesId);
  
    // Append reservationId separately, outside of the drivers loop
    if (reservationId) {
      formDataToSend.append('reservationId', reservationId);
    }
  
    // Append the driver details
    formData.drivers.forEach((driver, index) => {
      formDataToSend.append(`drivers[${index}][dname]`, driver.dname);
      formDataToSend.append(`drivers[${index}][dphone]`, driver.dphone);
      formDataToSend.append(`drivers[${index}][demail]`, driver.demail);
      formDataToSend.append(`drivers[${index}][dexperience]`, driver.dexperience);
  
      if (driver.dlicense) {
        formDataToSend.append(`drivers[${index}][dlicense]`, driver.dlicense);
      }
      if (driver.dpolicy) {
        formDataToSend.append(`drivers[${index}][dpolicy]`, driver.dpolicy);
      }
    });
  
    try {
      const response = await axios.post('http://44.196.192.232:5001/api/book/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201) {
        setSuccessMessage('Booking successfully created!');
        localStorage.setItem('bookFormId', response.data.id);
        navigate('/agreement');
      } else {
        setErrorMessage(`Failed to save booking data: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setErrorMessage('Error submitting the form. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
          <input type="text" name="bsize" placeholder="Enter Cart Size" value={formData.bsize} onChange={handleInputChange} />
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
                <label><i className="fa-solid fa-person"></i> Name</label>
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
                <label><i className="fa-solid fa-file"></i> Insurance Policy</label>
                <input type="file" onChange={(e) => handleFileChange(index, 'dpolicy', e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-star"></i> Experience</label>
                <input type="text" name="dexperience" placeholder="Enter Experience" value={driver.dexperience} onChange={(e) => handleDriverChange(index, e)} />
              </div>
            </div>
            <button type="button" className="remove-driver" onClick={() => removeDriver(index)}>Remove Driver</button>
          </div>
        ))}
        <button type="button" className="add-driver" onClick={addDriver}>Add Driver</button>
      </div>

      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Booking'}</button>
    </form>
  );
};

export default BookingForm;
