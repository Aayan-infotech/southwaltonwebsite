import React from 'react';
import './HomeSection1.scss';
import homebg2 from "./img/homebg2.png";
import { Link } from 'react-router-dom';

const HomeSection1 = () => {
  return (
    <div className='home1'>
      <div className="image-container">
        <img src={homebg2} alt="Background" className="background-image" />
        <div className="home1-btn">
          <button>
            <Link to ='/home3' style={{textDecoration:"none", color:"black"}}>
              Reserve A Cart
            </Link>
          </button>
        </div>
      </div>
    </div> 
  );
}

export default HomeSection1;
