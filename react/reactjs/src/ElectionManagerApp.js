import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './ElectionManagerApp.css';
import ElectionManagerDashboard from "./Components/ElectionManager/Dashboard";
import ElectionManagerElectionDetails from './Components/ElectionManager/ElectionDetails';
import ElectionManagerCandidateProfiles from "./Components/ElectionManager/Candidate Profiles/CandidateProfiles";
import ElectionManagerListOfVoters from "./Components/ElectionManager/List Of Voters/ListOfVoters";
import Summary1 from "./Components/ElectionManager/Summary/SummaryPage1";
import Summary2 from "./Components/ElectionManager/Summary/SummaryPage2";
import Summary3 from "./Components/ElectionManager/Summary/SummaryPage3";
import OngoingElectionSummary from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary";
import OngoingElectionSummary2 from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary2";
import OngoingElectionSummary3 from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary3";
import ScheduledElectionSummary from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary";
import ScheduledElectionSummary2 from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary2";
import ScheduledElectionSummary3 from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary3";


function ElectionManagerApp() {
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
          <Route path='/ongoing-election' element={<OngoingElectionSummary/>} /> 
          <Route path='/ongoing-election-summary2' element={<OngoingElectionSummary2 />} />
          <Route path='/ongoing-election-summary3' element={<OngoingElectionSummary3 />} />
          <Route path='/scheduled-election' element={<ScheduledElectionSummary/>} /> 
          <Route path='/scheduled-election-summary2' element={<ScheduledElectionSummary2 />} />
          <Route path='/scheduled-election-summary3' element={<ScheduledElectionSummary3 />} />

        </Routes>
      </Router>
    );
  }
  
  export default ElectionManagerApp;
  