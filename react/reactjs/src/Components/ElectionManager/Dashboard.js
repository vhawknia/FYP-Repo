import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ElectionManagerDashboard() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchElections();
  }, []);



  const fetchElections = async () => {
    try {
      console.log('Fetching elections...');
      const response = await axios.get('http://127.0.0.1:8000/api/elections/');  // Ensure this URL matches your Django server's URL
      console.log('Fetched data:', response.data);
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching election data:', error);
    }
  };
  

  function handleNewElection() {
    navigate('/election-manager/election-details');
  }

  function navigateCompleted(){
    navigate('/election-manager/completed-election');
  }

  function navigateArchived(){
    navigate('/election-manager/archived-elections');
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
          <button onClick={navigateArchived}>Archived Elections</button>
          <button onClick={handleNewElection}>New Election</button>
        </div>

        <div className="election-item-titles">
          <div><u>Election Name</u></div>
          <div><u>Status</u></div>
          <div><u>Start Date</u></div>
          <div><u>End Date</u></div>
        </div>

        {elections.map(election => (
          <button 
            key={election.id} 
            className="election-item" 
            onClick={() => navigate(`/election-manager/${election.status}-election`)}
          >
            <div>{election.title}</div>
            <div>{election.status}</div>
            <div>{new Date(election.startDate).toLocaleString()}</div>
            <div>{new Date(election.endDate).toLocaleString()}</div>
          </button>
        ))}

        <br />
        <div className="dashboardText"><span>Completed Elections</span></div>
        
        <div className="election-item-titles">
          <div><u>Election Name</u></div>
          <div><u>Status</u></div>
          <div><u>Start Date</u></div>
          <div><u>End Date</u></div>
          <div><u>Voters Dept</u></div>
        </div>

        {elections.filter(election => election.status === 'completed').map(election => (
          <button 
            key={election.id} 
            className="election-item" 
            onClick={navigateCompleted}
          >
            <div>{election.title}</div>
            <div>{election.status}</div>
            <div>{new Date(election.startDate).toLocaleString()}</div>
            <div>{new Date(election.endDate).toLocaleString()}</div>
          </button>
        ))}

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

export default ElectionManagerDashboard;
