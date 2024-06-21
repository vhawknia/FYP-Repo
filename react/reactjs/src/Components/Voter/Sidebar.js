import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (location) => {
    navigate(location);
  };

  const stylization = {
    fontWeight: 400,
    fontSize: '18px',
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0',
  };

  const stylizationLogout = {
    marginTop: '45px',
    fontWeight: 400,
    fontSize: '20px',
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0',
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <button style={stylization} onClick={() => handleNavigate('/voter/')}>Pending Elections</button>
      </div>
      <div className="sidebar-item">
        <button style={stylization} onClick={() => handleNavigate('/voter/election-results')}>Election Results</button>
      </div>
      <div className="sidebar-item">
        <button style={stylization} onClick={() => handleNavigate('/voter/account-settings')}>Account Settings</button>
      </div>
      <div className="sidebar-item">
        <button style={stylization} onClick={() => handleNavigate('/voter/privacy-policy')}>Privacy Policy</button>
      </div>
      <div className="sidebar-item">
        <button style={stylizationLogout} onClick={() => handleNavigate('/voter/logout')}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
