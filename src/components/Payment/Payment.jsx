// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBxjrADpEXHEbWsjPEU55y2iYs2a3U0m0kB0GJOFkaBw81Aojn3lrSwhz54SgRPKDzpIlvm5W600E8EO4egn');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const fetchUserDetails = async () => {
//     const userId = localStorage.getItem('user');
//     console.log(userId);
//     // Retrieve the user ID from local storage

//     if (!userId) {
//       setError('User ID not found');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//       console.log("response", response);
//       setEmail(response.data.data.email); // Assuming your API returns an object with an `email` field
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//       setError('Failed to fetch user details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVehicleDetails = async () => {
//     const vehicleId = localStorage.getItem('vehicle_Id');
//     console.log(vehicleId);
//     // Retrieve the vehicle ID from local storage

//     if (!vehicleId) {
//       setError('Vehicle ID not found');
//       return;
//     }

//     try {
//       const response = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//       console.log("vehicle response", response);
//       setAmount(response.data.vprice); // Assuming your API returns an object with a `price` field
//     } catch (err) {
//       console.error('Error fetching vehicle details:', err);
//       setError('Failed to fetch vehicle details');
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//     fetchVehicleDetails();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     const cardNumberElement = elements.getElement(CardNumberElement);
//     const cardExpiryElement = elements.getElement(CardExpiryElement);
//     const cardCvcElement = elements.getElement(CardCvcElement);

//     setLoading(true);

//     try {
//       const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//         amountInDollars: amount
//       });

//       const { clientSecret } = data;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardNumberElement,
//           billing_details: {
//             email: email
//           }
//         }
//       });

//       if (result.error) {
//         console.error(result.error.message);
//         setMessage(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           navigate('/payment-successfully', { state: { transactionId: result.paymentIntent.id, paymentRequestId } });
//         }
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setMessage('Payment Failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className='Payment'>
//       <div className="payment-container">
//         <div className="input-container">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div className="input-container">
//           <label htmlFor="amount">Amount (in USD)</label>
//           <input
//             id="amount"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             readOnly
//           />
//         </div>

//         <div className="input-container">
//           <label>Card Number</label>
//           <div className="stripe-input">
//             <CardNumberElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: '16px',
//                     color: '#424770',
//                     '::placeholder': {
//                       color: '#aab7c4',
//                     },
//                   },
//                   invalid: {
//                     color: '#9e2146',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>

//         <div className="input-container">
//           <div className="split-input">
//             <label>Expiry Date</label>
//             <div className="stripe-input">
//               <CardExpiryElement
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: '16px',
//                       color: '#424770',
//                       '::placeholder': {
//                         color: '#aab7c4',
//                       },
//                     },
//                     invalid: {
//                       color: '#9e2146',
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           <div className="split-input">
//             <label>CVC</label>
//             <div className="stripe-input">
//               <CardCvcElement
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: '16px',
//                       color: '#424770',
//                       '::placeholder': {
//                         color: '#aab7c4',
//                       },
//                     },
//                     invalid: {
//                       color: '#9e2146',
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : 'Pay'}
//         </button>

//         {message && <div className="message">{message}</div>}
//         {error && <div className="error">{error}</div>}
//       </div>
//     </form>
//   );
// };

// const PaymentForm = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default PaymentForm;
// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBxjrADpEXHEbWsjPEU55y2iYs2a3U0m0kB0GJOFkaBw81Aojn3lrSwhz54SgRPKDzpIlvm5W600E8EO4egn');

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [paymentRequestId, setPaymentRequestId] = useState(''); // Added state for paymentRequestId

//     const fetchUserDetails = async () => {
//         const userId = localStorage.getItem('user');
//         if (!userId) {
//             setError('User ID not found');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//             setEmail(response.data.data.email);
//         } catch (err) {
//             console.error('Error fetching user details:', err);
//             setError('Failed to fetch user details');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchVehicleDetails = async () => {
//         const vehicleId = localStorage.getItem('vehicle_Id');
//         if (!vehicleId) {
//             setError('Vehicle ID not found');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//             setAmount(response.data.vprice);
//         } catch (err) {
//             console.error('Error fetching vehicle details:', err);
//             setError('Failed to fetch vehicle details');
//         }
//     };

//     useEffect(() => {
//         fetchUserDetails();
//         fetchVehicleDetails();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         setLoading(true);

//         try {
//             const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//                 amountInDollars: amount
//             });

//             const { clientSecret, paymentRequestId: requestId, transactionId } = data;
//             setPaymentRequestId(requestId); // Set paymentRequestId from server response

//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardNumberElement,
//                     billing_details: {
//                         email: email
//                     }
//                 }
//             });

//                 if (result.error) {
//                     console.error(result.error.message);
//                     setMessage(result.error.message);
//                 } else {
//                     if (result.paymentIntent.status === 'succeeded') {

//                         navigate('/payment-successfully', { state: { transactionId, paymentRequestId: requestId } });
//                     }
//                 }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setMessage('Payment Failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='Payment'>
//             <div className="payment-container">
//                 <div className="input-container">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label htmlFor="amount">Amount (in USD)</label>
//                     <input
//                         id="amount"
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         placeholder="Enter amount"
//                         readOnly
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label>Card Number</label>
//                     <div className="stripe-input">
//                         <CardNumberElement
//                             options={{
//                                 style: {
//                                     base: {
//                                         fontSize: '16px',
//                                         color: '#424770',
//                                         '::placeholder': {
//                                             color: '#aab7c4',
//                                         },
//                                     },
//                                     invalid: {
//                                         color: '#9e2146',
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>
//                 </div>

//                 <div className="input-container">
//                     <div className="split-input">
//                         <label>Expiry Date</label>
//                         <div className="stripe-input">
//                             <CardExpiryElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div className="split-input">
//                         <label>CVC</label>
//                         <div className="stripe-input">
//                             <CardCvcElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Processing...' : 'Pay'}
//                 </button>

//                 {message && <div className="message">{message}</div>}
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </form>
//     );
// };

// const PaymentForm = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentForm;
// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBnQ4FXQCCb548b6cL50JVVuZxBRHqrkwxMfmcBTDGclAqwnVFiNtSvtNHgOPGxhJzlQjzrPPr00i340x8H3');

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [paymentRequestId, setPaymentRequestId] = useState('');
//     const [transactionId, setTransactionId] = useState('');

//     // Fetch user details
//     const fetchUserDetails = async () => {
//         const userId = localStorage.getItem('user');
//         if (!userId) {
//             setError('User ID not found');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//             setEmail(response.data.data.email);
//             setPhone(response.data.data.phone); 
//         } catch (err) {
//             console.error('Error fetching user details:', err);
//             setError('Failed to fetch user details');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch vehicle details
//     const fetchVehicleDetails = async () => {
//         const vehicleId = localStorage.getItem('vehicle_Id');
//         if (!vehicleId) {
//             setError('Vehicle ID not found');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//             setAmount(response.data.vprice);
//         } catch (err) {
//             console.error('Error fetching vehicle details:', err);
//             setError('Failed to fetch vehicle details');
//         }
//     };

//     useEffect(() => {
//         fetchUserDetails();
//         fetchVehicleDetails();
//     }, []);

//     // Send payment details
//     const sendPaymentDetails = async (transactionId, bookingId, email, phone) => {
//         try {
//             console.log('Sending payment details:', { transactionId, bookingId, email, phone }); // Debugging log
//             await axios.post('http://44.196.64.110:5001/api/pay/register', {
//                 transactionId,
//                 bookingId,
//                 email,
//                 phone
//             });
//             console.log('Payment details sent successfully.');
//         } catch (error) {
//             console.error('Error sending payment details:', error);
//             setError('Failed to send payment details');
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         setLoading(true);

//         try {
//             // Create payment intent
//             const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//                 amountInDollars: amount
//             });

//             const { clientSecret, paymentRequestId: requestId, transactionId } = data;
//             setPaymentRequestId(requestId);
//             setTransactionId(transactionId); 

//             // Confirm card payment
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardNumberElement,
//                     billing_details: {
//                         email: email
//                     }
//                 }
//             });

//             if (result.error) {
//                 console.error(result.error.message);
//                 setMessage(result.error.message);
//             } else {
//                 if (result.paymentIntent.status === 'succeeded') {
//                     const bookingId = localStorage.getItem('user');

//                     console.log('Payment succeeded, transactionId:', transactionId); // Debugging log

//                     // Send payment details after successful payment
//                     sendPaymentDetails(transactionId, bookingId, email, phone);

//                     navigate('/payment-successfully', { state: { transactionId, paymentRequestId: requestId } });
//                 }
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setMessage('Payment Failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='Payment'>
//             <div className="payment-container">
//                 <div className="input-container">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label htmlFor="amount">Amount (in USD)</label>
//                     <input
//                         id="amount"
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         placeholder="Enter amount"
//                         readOnly
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label>Card Number</label>
//                     <div className="stripe-input">
//                         <CardNumberElement
//                             options={{
//                                 style: {
//                                     base: {
//                                         fontSize: '16px',
//                                         color: '#424770',
//                                         '::placeholder': {
//                                             color: '#aab7c4',
//                                         },
//                                     },
//                                     invalid: {
//                                         color: '#9e2146',
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>
//                 </div>

//                 <div className="input-container">
//                     <div className="split-input">
//                         <label>Expiry Date</label>
//                         <div className="stripe-input">
//                             <CardExpiryElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div className="split-input">
//                         <label>CVC</label>
//                         <div className="stripe-input">
//                             <CardCvcElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Processing...' : 'Pay'}
//                 </button>

//                 {message && <div className="message">{message}</div>}
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </form>
//     );
// };

// const PaymentForm = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentForm;
// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBnQ4FXQCCb548b6cL50JVVuZxBRHqrkwxMfmcBTDGclAqwnVFiNtSvtNHgOPGxhJzlQjzrPPr00i340x8H3');

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [transactionId, setTransactionId] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user details
//                 const userId = localStorage.getItem('user');
//                 if (userId) {
//                     const userResponse = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//                     setEmail(userResponse.data.data.email);
//                     setPhone(userResponse.data.data.phone);
//                 } else {
//                     throw new Error('User ID not found');
//                 }

//                 // Fetch vehicle details
//                 const vehicleId = localStorage.getItem('vehicle_Id');
//                 if (vehicleId) {
//                     const vehicleResponse = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//                     setAmount(vehicleResponse.data.vprice);
//                 } else {
//                     throw new Error('Vehicle ID not found');
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message || 'An error occurred');
//             }
//         };

//         fetchData();
//     }, []);

//     const sendPaymentDetails = async (transactionId, bookingId) => {
//         try {
//             console.log('Sending payment details:', { transactionId, bookingId, email, phone,amount });
//             await axios.post('http://44.196.64.110:5001/api/pay/register', {
//                 transactionId,
//                 bookingId,
//                 email,
//                 phone,
//                 amount
//             });
//             console.log('Payment details sent successfully.');
//         } catch (error) {
//             console.error('Error sending payment details:', error);
//             setError('Failed to send payment details');
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         setLoading(true);
 
//         try {
//             // Create payment intent
//             const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//                 amountInDollars: amount
//             });

//             const { clientSecret, transactionId } = data;

//             // Confirm card payment
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardNumberElement,
//                     billing_details: { email }
//                 }
//             });

//             if (result.error) {
//                 setMessage(result.error.message);
//             } else if (result.paymentIntent.status === 'succeeded') {
//                 const bookingId = localStorage.getItem('user');
//                 await sendPaymentDetails(transactionId, bookingId);

//                 navigate('/payment-successfully', { state: { transactionId } });
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setMessage('Payment Failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='Payment'>
//             <div className="payment-container">
//                 <div className="input-container">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label htmlFor="amount">Amount (in USD)</label>
//                     <input
//                         id="amount"
//                         type="number"
//                         value={amount}
//                         readOnly
//                         placeholder="Amount will be fetched"
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label>Card Number</label>
//                     <div className="stripe-input">
//                         <CardNumberElement
//                             options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                         />
//                     </div>
//                 </div>

//                 <div className="input-container">
//                     <div className="split-input">
//                         <label>Expiry Date</label>
//                         <div className="stripe-input">
//                             <CardExpiryElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>

//                     <div className="split-input">
//                         <label>CVC</label>
//                         <div className="stripe-input">
//                             <CardCvcElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Processing...' : 'Pay'}
//                 </button>

//                 {message && <div className="message">{message}</div>}
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </form>
//     );
// };

// const PaymentForm = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentForm;
// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBcNp5UT4dfveEftKvOvirubtf9xPBEfp2Uu3K5L5bOO9OjoJCQhaAzNqWIsY7fWmkKOHlvKaZ00A04yTHB6');

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [transactionId, setTransactionId] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user details
//                 const userId = localStorage.getItem('user');
//                 if (userId) {
//                     const userResponse = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//                     setEmail(userResponse.data.data.email);
//                     setPhone(userResponse.data.data.phone);
//                 } else {
//                     throw new Error('User ID not found');
//                 }

//                 // Fetch vehicle details
//                 const vehicleId = localStorage.getItem('vehicle_Id');
//                 if (vehicleId) {
//                     const vehicleResponse = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//                     setAmount(vehicleResponse.data.vprice);
//                 } else {
//                     throw new Error('Vehicle ID not found');
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message || 'An error occurred');
//             }
//         };

//         fetchData();
//     }, []);

//     const sendPaymentDetails = async (transactionId, userId) => {
//         try {
//             console.log('Sending payment details:', { transactionId, userId, email, phone, amount ,bookingId});
//             await axios.post('http://44.196.64.110:5001/api/pay/register', {
//                 transactionId,
//                 userId,
//                 email,
//                 phone,
//                 bookingId,
//                 amount // Ensure amount is being sent here
//             });
//             console.log('Payment details sent successfully.');
//         } catch (error) {
//             console.error('Error sending payment details:', error);
//             setError('Failed to send payment details');
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements || !amount) {
//             setMessage('Stripe has not loaded or amount is missing.');
//             return;
//         }

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         setLoading(true);
 
//         try {
//             // Create payment intent
//             const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//                 amountInDollars: amount
//             });

//             const { clientSecret, transactionId } = data;

//             // Confirm card payment
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardNumberElement,
//                     billing_details: { email }
//                 }
//             });

//             if (result.error) {
//                 setMessage(result.error.message);
//             } else if (result.paymentIntent.status === 'succeeded') {
//                 const userId = localStorage.getItem('user');
//                 const bookingId=localStorage.getItem('bookFormId')
//                 await sendPaymentDetails(transactionId, userId,bookingId);

//                 navigate('/payment-successfully', { state: { transactionId } });
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setMessage('Payment Failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='Payment'>
//             <div className="payment-container">
//                 <div className="input-container">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label htmlFor="amount">Amount (in USD)</label>
//                     <input
//                         id="amount"
//                         type="number"
//                         value={amount}
//                         readOnly
//                         placeholder="Amount will be fetched"
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label>Card Number</label>
//                     <div className="stripe-input">
//                         <CardNumberElement
//                             options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                         />
//                     </div>
//                 </div>

//                 <div className="input-container">
//                     <div className="split-input">
//                         <label>Expiry Date</label>
//                         <div className="stripe-input">
//                             <CardExpiryElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>

//                     <div className="split-input">
//                         <label>CVC</label>
//                         <div className="stripe-input">
//                             <CardCvcElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Processing...' : 'Pay'}
//                 </button>

//                 {message && <div className="message">{message}</div>}
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </form>
//     );
// };

// const PaymentForm = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentForm;
// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Payment.scss';

// const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBcNp5UT4dfveEftKvOvirubtf9xPBEfp2Uu3K5L5bOO9OjoJCQhaAzNqWIsY7fWmkKOHlvKaZ00A04yTHB6');

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const [reservationId, setReservationId] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user details
//                 const userId = localStorage.getItem('user');
//                 if (userId) {
//                     const userResponse = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
//                     setEmail(userResponse.data.data.email);
//                     setPhone(userResponse.data.data.phone);
//                 } else {
//                     throw new Error('User ID not found');
//                 }

//                 // Fetch vehicle details
//                 const vehicleId = localStorage.getItem('vehicleId');
//                 if (vehicleId) {
//                     const vehicleResponse = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
//                     setAmount(vehicleResponse.data.vprice);
//                 } else {
//                     throw new Error('Vehicle ID not found');
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message || 'An error occurred');
//             }
//         };

//         fetchData();
//     }, []);

//     const sendPaymentDetails = async (transactionId, userId, bookingId) => {
//         try {
//             console.log('Sending payment details:', { transactionId, userId, email, phone, amount, bookingId ,reservation});
//             await axios.post('http://44.196.64.110:5001/api/pay/register', {
//                 transactionId,
//                 userId,
//                 email,
//                 phone,
//                 bookingId,
//                 reservation,
//                 amount // Ensure amount is being sent here
//             });
//             console.log('Payment details sent successfully.');
//         } catch (error) {
//             console.error('Error sending payment details:', error);
//             setError('Failed to send payment details');
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements || !amount) {
//             setMessage('Stripe has not loaded or amount is missing.');
//             return;
//         }

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         setLoading(true);

//         try {
//             // Create payment intent
//             const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
//                 amountInDollars: amount
//             });

//             const { clientSecret, transactionId } = data;

//             // Confirm card payment
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardNumberElement,
//                     billing_details: { email }
//                 }
//             });

//             if (result.error) {
//                 setMessage(result.error.message);
//             } else if (result.paymentIntent.status === 'succeeded') {
//                 const userId = localStorage.getItem('user');
//                 debugger
//                 const bookingId = localStorage.getItem('bookFormId'); // Retrieve bookingId from localStorage
//                 const reservation=localStorage.getItem('reservationId');
//                 console.log('Reservation ID:', reservationId);
//                 await sendPaymentDetails(transactionId, userId, bookingId,reservation); // Pass bookingId

//                 navigate('/payment-successfully', { state: { transactionId } });
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setMessage('Payment Failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='Payment'>
//             <div className="payment-container">
//                 <div className="input-container">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label htmlFor="amount">Amount (in USD)</label>
//                     <input
//                         id="amount"
//                         type="number"
//                         value={amount}
//                         readOnly
//                         placeholder="Amount will be fetched"
//                     />
//                 </div>

//                 <div className="input-container">
//                     <label>Card Number</label>
//                     <div className="stripe-input">
//                         <CardNumberElement
//                             options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                         />
//                     </div>
//                 </div>

//                 <div className="input-container">
//                     <div className="split-input">
//                         <label>Expiry Date</label>
//                         <div className="stripe-input">
//                             <CardExpiryElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>

//                     <div className="split-input">
//                         <label>CVC</label>
//                         <div className="stripe-input">
//                             <CardCvcElement
//                                 options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Processing...' : 'Pay'}
//                 </button>

//                 {message && <div className="message">{message}</div>}
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </form>
//     );
// };

// const PaymentForm = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentForm;
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.scss';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [reservationId, setReservationId] = useState('');
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                const userId = localStorage.getItem('user');
                if (userId) {
                    const userResponse = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
                    setEmail(userResponse.data.data.email);
                    setPhone(userResponse.data.data.phone);
                } else {
                    throw new Error('User ID not found');
                }

                // Fetch vehicle details
                // const vehicleId = localStorage.getItem('vehicleId');
                // if (vehicleId) {
                //     const vehicleResponse = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicleId}`);
                //     setAmount(vehicleResponse.data.vprice);
                // } else {
                //     throw new Error('Vehicle ID not found');
                // }
                const storedAmount = localStorage.getItem('price');
                if (storedAmount) {
                    setAmount(storedAmount); // Set the amount from localStorage
                } else {
                    throw new Error('Price not found in localStorage');
                }

                // Fetch reservation ID
                const reservation = localStorage.getItem('reservationId');
                if (reservation) {
                    setReservationId(reservation);
                } else {
                    throw new Error('Reservation ID not found');
                }

            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred');
            }
        };

        fetchData();
    }, []);

    const sendPaymentDetails = async (transactionId, userId, bookingId, reservation) => {
        try {
            console.log('Sending payment details:', { transactionId, userId, email, phone, amount, bookingId, reservation });
            await axios.post('http://44.196.64.110:5001/api/pay/register', {
                transactionId,
                userId,
                email,
                phone,
                bookingId,
                reservation,  // Ensure the reservation is being sent here
                amount
            });
            console.log('Payment details sent successfully.');
        } catch (error) {
            console.error('Error sending payment details:', error);
            setError('Failed to send payment details');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !amount) {
            setMessage('Stripe has not loaded or amount is missing.');
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        setLoading(true);

        try {
            // Create payment intent
            const { data } = await axios.post('http://44.196.64.110:5001/api/payment/create-payment-intent', {
                amountInDollars: amount
            });

            const { clientSecret, transactionId } = data;

            // Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: { email }
                }
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                const userId = localStorage.getItem('user');
                localStorage.removeItem('price')
                const bookingId = localStorage.getItem('bookFormId'); // Retrieve bookingId from localStorage
                await sendPaymentDetails(transactionId, userId, bookingId, reservationId); // Pass reservationId

                navigate('/payment-successfully', { state: { transactionId , amount} });
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Payment Failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='Payment'>
            <div className="payment-container">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        readOnly
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="amount">Amount (in USD)</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        readOnly
                        placeholder="Amount will be fetched"
                    />
                </div>

                <div className="input-container">
                    <label>Card Number</label>
                    <div className="stripe-input">
                        <CardNumberElement
                            options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
                        />
                    </div>
                </div>

                <div className="input-container">
                    <div className="split-input">
                        <label>Expiry Date</label>
                        <div className="stripe-input">
                            <CardExpiryElement
                                options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
                            />
                        </div>
                    </div>

                    <div className="split-input">
                        <label>CVC</label>
                        <div className="stripe-input">
                            <CardCvcElement
                                options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } }}}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>

                {message && <div className="message">{message}</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
};

const PaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentForm;
