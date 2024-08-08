import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ElectionManagerDashboard() {
  const [elections, setElections] = useState([]); // All elections
  const [filteredElections, setFilteredElections] = useState([]); // Elections according to search criteria
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState("All");
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    fetchElections();
  }, []);

  useEffect(() => {
    // Filter elections to show only 'Scheduled' and 'Ongoing' initially
    const filtered = elections.filter(election => 
      election.status === 'Scheduled' || election.status === 'Ongoing'
    );
    setFilteredElections(filtered);
  }, [elections]);

  const fetchElections = async () => {
    try {
      console.log('Fetching elections...');
      const response = await axios.get('http://127.0.0.1:8000/api/elections/');
      console.log('Fetched data:', response.data);
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching election data:', error);
    }
  };  
  // ternary operator
  // filters the elections based on the filterState, if the statement filterState === 'All' is true then
  // the elections will filter to display both scheduled and ongoing elections, and also whereby the value in the search bar exists in the election title 
  // else it will display the elections whose status matches the filter state, along with the search criteria

  const handleSearch = () => {
    const filtered = filterState === 'All'
      ? elections.filter(election => 
          (election.status === 'Scheduled' || election.status === 'Ongoing') &&
          election.title.toLowerCase().includes(searchBar.toLowerCase())
        )
      : elections.filter(election => 
          election.status === filterState && 
          election.title.toLowerCase().includes(searchBar.toLowerCase())
        );
    setFilteredElections(filtered);
  };

  const formatDate = (dateString, timezone) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: timezone,
      timeZoneName: 'short',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  function handleNewElection() {
    navigate('/election-manager/election-details');
  }

  function navigateCompleted() {
    navigate('/election-manager/completed-election');
  }

  function navigateArchived() {
    navigate('/election-manager/archived-elections');
  }

  return (
    <>
      <Header />

      <div className="dashboard">
        
        <div className="dashboardText">Dashboard</div>
        
        <div className="search-bar-column">
          <input 
            type="text" 
            placeholder="Search by election title" 
            value={searchBar} 
            onChange={(e) => setSearchBar(e.target.value)}
          /> 
          <select 
            className='filter' 
            value={filterState} 
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Scheduled">Scheduled</option>
          </select>
          <button className='search-bar-button' onClick={handleSearch}>Search</button>
          <button onClick={navigateArchived}>Archived Elections</button>
          <button onClick={handleNewElection}>New Election</button>
        </div>

        <div className="election-item-titles">
          <div><u>Election Name</u></div>
          <div><u>Status</u></div>
          <div><u>Timezone</u></div>
          <div><u>Start Date</u></div>
          <div><u>End Date</u></div>
        </div>

        {filteredElections.map(election => (
          <button 
            key={election.id} 
            className="election-item" 
            onClick={() => navigate(`/election-manager/${election.status}-election`, { state: { election } })}
          >
            <div>{election.title}</div>
            <div>{election.status}</div>
            <div>{election.timezone}</div>
            <div>{formatDate(election.startDate, election.timezone)}</div>
            <div>{formatDate(election.endDate, election.timezone)}</div>
            {/* <div>Start Date: {election.startDate} / End Date: {election.endDate}</div> */}
          </button>
        ))}

        <br />
        <div className="dashboardText"><span>Completed Elections</span></div>
        
        <div className="election-item-titles">
          <div><u>Election Name</u></div>
          <div><u>Status</u></div>
          <div><u>Timezone</u></div>
          <div><u>Start Date</u></div>
          <div><u>End Date</u></div>
        </div>

        {elections.filter(election => election.status === 'Completed').map(election => (
          <button 
            key={election.id} 
            className="election-item" 
            onClick={navigateCompleted}
          >
            <div>{election.title}</div>
            <div>{election.status}</div>
            <div>{election.timezone}</div>
            <div>{formatDate(election.startDate, election.timezone)}</div>
            <div>{formatDate(election.endDate, election.timezone)}</div>
          </button>
        ))}

      </div>
    </>
  );
}

export default ElectionManagerDashboard;
