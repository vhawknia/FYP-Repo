import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './ElectionManagerApp.css';
import ElectionManagerDashboard from "./Components/ElectionManager/Dashboard";
import ElectionManagerElectionDetails from './Components/ElectionManager/ElectionDetails';
import ElectionManagerCandidateProfiles from "./Components/ElectionManager/CandidateProfiles";
import ElectionManagerListOfVoters from "./Components/ElectionManager/ListOfVoters";

function SysAdminApp() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<ElectionManagerDashboard />} />
          <Route path='/election-details' element={<ElectionManagerElectionDetails />} />
          <Route path='/candidate-profiles' element={<ElectionManagerCandidateProfiles />} />
          <Route path='/list-of-voters' element={<ElectionManagerListOfVoters />} />
          <Route path='/Summary' element={<ElectionManagerListOfVoters />} />
        </Routes>
      </Router>
    );
  }
  
  export default SysAdminApp;
  