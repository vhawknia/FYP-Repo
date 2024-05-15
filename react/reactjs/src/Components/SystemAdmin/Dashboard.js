//for system admin

import React from 'react';
import './Dashboard.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function SysAdminDashboard() {
  const navigate = useNavigate();  
  
  function handleNewElection() {
    navigate('/election-details'); 
  }

  return (
    <>
      <Header />

      <div className="dashboard">
        
        <div className="dashboardText">Dashboard</div>
        
        <div className="search-bar-column">
          <input type="text" placeholder="Search by election title" />
          <select className='filter'>
            <option value="ongoing">Ongoing</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <button className='search-bar-button'>Search</button>
          <button onClick={handleNewElection}>New Election</button>
        </div>

        <div className="election-item-titles">
          <div><u>Election Name</u></div>
          <div><u>Status</u></div>
          <div><u>Start Date</u></div>
          <div><u>End Date</u></div>
        </div>

        <button className="election-item">
          <div>Election Title 1</div>
          <div>Ongoing</div>
          <div>04/04/2024 8am</div>
          <div>10/04/2024 8am</div>
        </button>

        <button className="election-item">
          <div>Election Title 2</div>
          <div>Scheduled</div>
          <div>04/04/2025 8am</div>
          <div>10/04/2025 8am</div>
        </button>

        <div className="pagination">
          <button>{"<<"}</button>
          <button>{"<"}</button>
          <button>{"1"}</button>
          <button>{"2"}</button>
          <button>{"3"}</button>
          <button>{"4"}</button>
          <button>{"5"}</button>
          <button>{">"}</button>
          <button>{">>"}</button>
        </div>
      </div>
    </>
  );
}

export default SysAdminDashboard;

