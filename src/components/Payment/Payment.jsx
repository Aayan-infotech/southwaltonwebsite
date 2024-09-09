  import React, { useState, useEffect } from 'react';
  import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
  import { loadStripe } from '@stripe/stripe-js';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import './Payment.scss';

  // Initialize Stripe with your publishable key
  const stripePromise = loadStripe('pk_test_51PsifGP6k3IQ77YBkDtBhdIBChgghSieG7ECcNXbemM9hD80IayjJGZigLsQW2KiYhtsmwQWea2QzInQMrUhjWnr00JEMzZqKV');

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('user');
      console.log(userId);
      // Retrieve the user ID from local storage

      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/user/${userId}`);
        console.log("response", response);
        setEmail(response.data.data.email); // Assuming your API returns an object with an `email` field
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicleDetails = async () => {
      const vehicleId = localStorage.getItem('vehicle_Id');
      console.log(vehicleId);
      // Retrieve the vehicle ID from local storage

      if (!vehicleId) {
        setError('Vehicle ID not found');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/vehicle/vehicles/${vehicleId}`);
        console.log("vehicle response", response);
        setAmount(response.data.vprice); // Assuming your API returns an object with a `price` field
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
        setError('Failed to fetch vehicle details');
      }
    };

    useEffect(() => {
      fetchUserDetails();
      fetchVehicleDetails();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      setLoading(true);

      try {
        const { data } = await axios.post('http://localhost:5001/api/payment/create-payment-intent', {
          amountInDollars: amount
        });

        const { clientSecret } = data;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              email: email
            }
          }
        });

        if (result.error) {
          console.error(result.error.message);
          setMessage(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            navigate('/payment-successfully');
          }
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
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="amount">Amount (in USD)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              readOnly
            />
          </div>

          <div className="input-container">
            <label>Card Number</label>
            <div className="stripe-input">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="input-container">
            <div className="split-input">
              <label>Expiry Date</label>
              <div className="stripe-input">
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="split-input">
              <label>CVC</label>
              <div className="stripe-input">
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
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
