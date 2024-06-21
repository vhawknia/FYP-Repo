import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./Logout";
import LoginForm from './LoginForm'; 
import AccMng from './AccMng';
import AdminElectionResults from "./AdminElectionResults";

import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
//import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          <div className="voter-elections-section">
            <h2>Pending Elections</h2>
            <div className="voter-elections-list">
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>
                    <div><span><b><u>Election 1</u></b></span></div>
                    <div>Election Manager - xxx</div>
                  </div>
                  
                  <div className="voter-election-deadline">
                    <div>Start Date: 31 Dec</div>
                    <div>Deadline: 1st Jan</div>
                  </div>
                  <button>Delete</button>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>
                    <div><span><b><u>Election 2</u></b></span></div>
                  </div>

                  <div className="voter-election-deadline">
                    <div>Deadline: 2nd Jan 2024</div>
                  </div>
                  <button>Delete</button>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                <div><span><b><u>Election 3</u></b></span></div>
                  <div className="voter-election-deadline">
                    <div>Deadline: 3rd Jan 2024</div>
                  </div>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="voter-elections-section">
            <h2>Completed Elections</h2>
            <div className="voter-elections-list">
              <div className="voter-election">
                <div className="voter-election-info">
                  <div>
                    <div><span><b><u>Election 4</u></b></span></div>
                    <div>Election Manager: yyy</div>
                  </div>
                
                  <div className="voter-election-deadline">
                    <div>Completed Date: 15 Dec</div>
                  </div>
                </div>
              </div>
              <div className="voter-election">
                <div className="voter-election-info">
                <div><span><b><u>Election 5</u></b></span></div>
                  <div className="voter-election-deadline">
                    <div>Completed Date: 25 Dec</div>
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

  
  export default AdminDashboard;
 
