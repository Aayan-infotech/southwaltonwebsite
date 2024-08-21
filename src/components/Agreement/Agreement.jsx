import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Agreement.scss';


const Agreement = () => {
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState('');
  
const navigate = useNavigate();

  const handleClear = () => {
    sigCanvas.current.clear();
    setSignature('');
  };

  const handleSave = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(dataURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signature) {
      alert('Please sign before submitting.');
      return;
    }

    const userId = localStorage.getItem('user').replace(/"/g, '');
    console.log(userId);
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    try {
      await axios.post('http://3.111.163.2:5001/api/sign/save', { 
        userId,
        signatureData: signature 
      });
      alert('Signature saved successfully!');
      navigate('/feedback'); 
    } catch (error) {
      console.error('Error saving signature:', error.response ? error.response.data : error.message);
    }
  };

  // mahi
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Agreement</h1>
      <div className="agreement-form">
        <div className="agreement-content">
          <p>
            Thank you for allowing us to make your vacation and cart rental experience memorable. It is VERY important that you read this agreement especially as it pertains to rules, damage fees, and check-in photos...
          </p>
        </div>
      </div>

      <div className="signature">
        <form onSubmit={handleSubmit}>
          <label htmlFor="signature">Draw Your Signature</label><br />
          
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
          
          <div className="button-group">
            <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit">Submit</button>
          </div>
        </form>

        {signature && (
          <div className="signature-preview">
            <h3>Saved Signature:</h3>
            <img src={signature} alt="Signature" />
          </div>
        )}
      </div>
    </>
  );
};

export default Agreement;
