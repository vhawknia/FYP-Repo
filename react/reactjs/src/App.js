import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ElectionManagerAppLayout from "./ElectionManagerAppLayout";
import VoterAppLayout from "./VoterAppLayout";

// Import components for VoterApp
import Dashboard from "./Components/Voter/Dashboard";
import ElectionResults from "./Components/Voter/ElectionResults";
import AccountSettings from "./Components/Voter/AccountSettings";
import PrivacyPolicy from "./Components/Voter/PrivacyPolicy";
import Logout from "./Logout";
import Voting from "./Components/Voter/Voting";
import LoginForm from './Components/Accounts/LoginForm';

// Import components for SystemAdminApp
import AccMng from './Components/Accounts/AccMng';
import AdminDashboard from './Components/Accounts/AdminDashboard';
import AdminElectionResults from "./Components/Accounts/AdminElectionResults";

// Import components for ElectionManagerApp
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
import CompletedElections from "./Components/ElectionManager/CompletedElections";
import ArchivedElections from "./Components/ElectionManager/ArchivedElections";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        {/* VoterApp Routes */}
        <Route path="/voter/*" element={<VoterApp />} />

        {/* ElectionManagerApp Routes */}
        <Route path="/election-manager/*" element={<ElectionManagerApp />} />

        {/* SystemAdmin Routes */}
        <Route path="/system-admin/*" element={<SystemAdminApp />} />
      </Routes>
    </Router>
  );
}

function VoterApp() {
  return (
    <VoterAppLayout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/election-results' element={<ElectionResults />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/election-voting' element={<Voting />} />
      </Routes>
    </VoterAppLayout>
  );
}

function SystemAdminApp() {
  return (
    <Routes>
      <Route path='/' element={<AdminDashboard />} />
      <Route path='/AccMng' element={<AccMng />} />
      <Route path='/admin-election-results' element={<AdminElectionResults />} />
    </Routes>
  )
}

function ElectionManagerApp() {
  return (
    <ElectionManagerAppLayout>
      <Routes>
        <Route path='/' element={<ElectionManagerDashboard />} />
        <Route path='/election-details' element={<ElectionManagerElectionDetails />} />
        <Route path='/candidate-profiles' element={<ElectionManagerCandidateProfiles />} />
        <Route path='/list-of-voters' element={<ElectionManagerListOfVoters />} />
        <Route path='/summary-1' element={<Summary1 />} />
        <Route path='/summary-2' element={<Summary2 />} />
        <Route path='/summary-3' element={<Summary3 />} />
        <Route path='/ongoing-election' element={<OngoingElectionSummary />} /> 
        <Route path='/ongoing-election-summary2' element={<OngoingElectionSummary2 />} />
        <Route path='/ongoing-election-summary3' element={<OngoingElectionSummary3 />} />
        <Route path='/scheduled-election' element={<ScheduledElectionSummary />} /> 
        <Route path='/scheduled-election-summary2' element={<ScheduledElectionSummary2 />} />
        <Route path='/scheduled-election-summary3' element={<ScheduledElectionSummary3 />} />
        <Route path='/completed-election' element={<CompletedElections />} />
        <Route path='/archived-elections' element={<ArchivedElections />} />
      </Routes>
    </ElectionManagerAppLayout>
  );
}

export default App;
