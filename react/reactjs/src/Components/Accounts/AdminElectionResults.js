import React from 'react';
//import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './AdminElectionResults.css';

function AdminElectionResults() {
  return (
    <div className="voter-app-container">
      {/*<NewHeader />*/}
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          <div className="voter-elections-section">
            <h2>Election Results</h2>
            <div className="voter-elections-list">
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>Election 1: Election Manager: xxx</div>
                  <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
                  </div>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>Election 2: Election Manager: xxx</div>
                  <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
                  </div>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>Election 3: Election Manager: xxx</div>
                  <div className="voter-election-results">
                    <div>Winner: xxx</div>
                    <div>Vote Count: 100</div>
                    <div>Total Votes: 150</div>
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

export default AdminElectionResults;
