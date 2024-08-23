import React, { useState, useEffect } from 'react';
import './Booking2.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CombinedComponent = () => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`http://3.111.163.2:5001/api/vehicle/`);
      console.log('response', response.data)
      setModels(response.data);
      console.log('model', models)
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };
  useEffect(() => {

    fetchModels();
  }, []);

  const removecart = async (id, status) => {
    try {
      console.log(id, status);
      await axios.put(`http://3.111.163.2:5001/api/vehicle/removecart/${id}`, { status });
      fetchModels();
    } catch (error) {
      console.log('Error changing Status', error);
    }
  }

  useEffect(() => {
    // Log models when it updates
    console.log('Updated models:', models);
  }, [models]);

  return (
    <div className="combined-container">
      {models.map((model) => {
        if (model.Addtocart) {  // Check if addToCart is true
          return (
            <div key={model.id} className="cart-model">
              <div className="cart-card">
                <img src={`http://3.111.163.2:5001/uploads/${model.image}`} alt={model.vname} className="cart-image" />
                <div className="cart-details">
                  <div className="cart-passengers">{model.vseats} Passengers</div>
                  <div className="cart-name">{model.vname}</div>
                  <div className="cart-price">Price ${model.vprice}</div>
                  {/* <button className="remove"onClick={() => removecart(model._id, model.Addtocart)}>Remove</button> */}
                  <Link to='/checkout'><button className='Continue'> Continue</button></Link>
                </div>
              </div>
              <div>

              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CombinedComponent;
