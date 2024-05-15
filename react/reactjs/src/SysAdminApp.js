import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './SysAdminApp.css';
import SysAdminDashboard from "./Components/SystemAdmin/Dashboard";
import SysAdminElectionDetails from './Components/SystemAdmin/ElectionDetails';
import SysAdminCandidateProfiles from "./Components/SystemAdmin/CandidateProfiles";
function SysAdminApp() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<SysAdminDashboard />} />
          <Route path='/election-details' element={<SysAdminElectionDetails />} />
          <Route path='/candidate-profiles' element={<SysAdminCandidateProfiles />} />
          <Route path='/list-of-voters' element={<SysAdminElectionDetails />} />
          <Route path='/Summary' element={<SysAdminElectionDetails />} />
        </Routes>
      </Router>
    );
  }
  
  export default SysAdminApp;
  