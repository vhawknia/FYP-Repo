import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './ElectionManagerApp.css';
import ElectionManagerDashboard from "./Components/ElectionManager/Dashboard";
import ElectionManagerElectionDetails from './Components/ElectionManager/ElectionDetails';
import ElectionManagerCandidateProfiles from "./Components/ElectionManager/CandidateProfiles";
import ElectionManagerListOfVoters from "./Components/ElectionManager/ListOfVoters";
import Summary1 from "./Components/ElectionManager/SummaryPage1";
import Summary2 from "./Components/ElectionManager/SummaryPage2";
import Summary3 from "./Components/ElectionManager/SummaryPage3";

function SysAdminApp() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<ElectionManagerDashboard />} />
          <Route path='/election-details' element={<ElectionManagerElectionDetails />} />
          <Route path='/candidate-profiles' element={<ElectionManagerCandidateProfiles />} />
          <Route path='/list-of-voters' element={<ElectionManagerListOfVoters />} />
          <Route path='/summary-1' element={<Summary1 />} />
          <Route path='/summary-2' element={<Summary2 />} />
          <Route path='/summary-3' element={<Summary3 />} />
        </Routes>
      </Router>
    );
  }
  
  export default SysAdminApp;
  