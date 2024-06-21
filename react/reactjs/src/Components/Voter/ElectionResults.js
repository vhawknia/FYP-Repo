import React from 'react';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './ElectionResults.css';
import { useState } from 'react';

function ElectionResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [completedElection, setCopmletedElection] = useState([
    {id: 1, name: 'Election 1', winner: 'xxx', vote_count: 100, total_votes: 150},
    {id: 2, name: 'Election 2', winner: 'xxx', vote_count: 150, total_votes: 200},
    {id: 3, name: 'Election 3', winner: 'xxx', vote_count: 200, total_votes: 250}
  ])
  
  const handleSearch = (event) => (
    setSearchTerm(event.target.value)
  )

  const filteredElections = completedElection.filter(election =>
    election.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          <div className="voter-elections-section">
            <div className="voter-election-section-header">
              <h2>Completed Election Results</h2>
              <input type="text"
               placeholder="Search for completed election results"
               onChange={handleSearch}
               value={searchTerm}
              ></input>
            </div>
            <div className="voter-elections-list">
              {filteredElections.map(election=> (
                <div key={election.id} className="voter-election">
                  <div className="voter-election-results-info">
                    <div>{election.name}</div>
                    <div className='voter-election-results'>
                      <div>Winner: {election.winner}</div>
                      <div>Vote Count: {election.vote_count}</div>
                      <div>Total Votes: {election.total_votes}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="voter-election">
                <div className="voter-election-results-info">
                  <div>Election 1</div>
                  <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
                  </div>
                </div>
              </div> */}

              {/* <div className="voter-election">
                <div className="voter-election-results-info">
                  <div>Election 2</div>
                  <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
                  </div>
                </div>
              </div> */}
              
              {/* <div className="voter-election">
                {/* <div className="voter-election-results-info">
                  <div>Election 3</div>
                  {/* <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
                  </div> }
                </div> }
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionResults;
