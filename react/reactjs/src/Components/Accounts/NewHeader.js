import React from 'react';
import './NewHeader.css';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../../Starbucks_Corporation_Logo_2011.png';
import { Link } from 'react-router-dom';

function NewHeader() {
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/');
  }

  const userStylization = {
    padding: '45px',
    fontWeight: 500,
    fontSize: '21px',
    fontFamily: 'Manrope, san-serif',
  };

  const homeStylization={
    
      width: '70px',
      height: 'auto',
      display: 'block',

  }

  return (
    <div className="header">
      <div className="home-section">
        <Link to="/">
          <img src={companyLogo} alt="Company Logo" style={homeStylization} />
        </Link>
      </div>
      <div className="user-section">
        <span style={userStylization}>Hello, Gabriel Chung - IT Dept</span>
      </div>
    </div>
  );
}

export default NewHeader;
