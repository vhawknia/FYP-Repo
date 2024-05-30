import React from 'react';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './AccountSettings.css';

function AccountSettings() {
  const stylization = {
    fontSize : '18px',
  }

  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          <div className="voter-account-section">
            <h2>Account Settings</h2>
            <div className="voter-account-details">
              <div className='info'><span style={stylization}>Name: Gabriel Chung</span></div>
              <div className='info'><span style={stylization}>Username: gabrielchung@work.com</span></div>
              <div className='info'><span style={stylization}>Department: IT</span></div>
            </div>
            <button className="voter-reset-button">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
