import React from 'react';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingElection, setPendingElection] = useState([
    {id: 1, name: 'Election 1', startdate: '31 Dec 2023', deadline: '1 Jan 2024'},
    {id: 2, name: 'Election 2', startdate: '31 Dec 2023', deadline: '2 Jan 2024'},
    {id: 3, name: 'Election 3', startdate: '31 Dec 2023', deadline: '3 Jan 2024'}
  ])

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  }

  const filteredElections = pendingElection.filter(election =>
    election.name.toLowerCase().includes(searchTerm.toLowerCase()) //set the value of the filtered election 
                                                                    //to the value of the search term
  );
  
  const handleNavigate = (location) => {
    navigate('/' + location);
  };

  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          <div className="voter-elections-section">
            <div className="voter-election-section-header">
              <h2>Pending Elections</h2>
              <input type="text"
               placeholder="Search for pending elections"
               onChange={handleSearch}
               value={searchTerm}
              ></input>
            </div>

            <div className="voter-elections-list">
              {filteredElections.map(election => (
                <div key={election.id} className="voter-election">
                  <div className="voter-election-info">
                    <div><span><b><u>{election.name}</u></b></span></div>
                    <div>Start Date: {election.startdate}</div>
                  </div>

                  <div className="voter-election-deadline">
                    <div>Deadline: {election.deadline}</div>
                    <button onClick={() => handleNavigate('voter/election-voting')}>Vote</button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          <div className="voter-elections-section">
            <h2>Processing Elections</h2>
            <div className="voter-elections-list">
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>
                    <div><span><b><u>Election 4</u></b></span></div>
                    <div>Election Manager: yyy</div>
                  </div>
                
                  <div className="voter-election-deadline">
                    <div>Completion Date: 15 Dec 2024</div>
                  </div>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                <div><span><b><u>Election 5</u></b></span></div>
                  <div className="voter-election-deadline">
                    <div>Completion Date: 25 Dec 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
