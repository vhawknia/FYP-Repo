import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VoterAppLayout from "./VoterAppLayout";
import ElectionManagerAppLayout from "./ElectionManagerAppLayout";

// Import components for VoterApp
import Dashboard from "./Components/Voter/Dashboard";
import ElectionResults from "./Components/Voter/ElectionResults";
import AccountSettings from "./Components/Voter/AccountSettings";
import PrivacyPolicy from "./Components/Voter/PrivacyPolicy";
import Logout from "./Logout";
import Voting from "./Components/Voter/Voting";
import LoginForm2 from './Components/Accounts/LoginForm2';

// Import components for SystemAdminApp
import AccMng from './Components/Accounts/AccMng';
import AdminDashboard from './Components/Accounts/AdminDashboard';
import AdminElectionResults from "./Components/Accounts/AdminElectionResults";

// Import components for ElectionManagerApp
import ElectionManager from './ElectionManager'; // New ElectionManager component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm2 />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* VoterApp Routes */}
        <Route path="/voter/*" element={<VoterAppLayout><VoterApp /></VoterAppLayout>} />

        {/* ElectionManagerRoutes */}
        <Route path="/election-manager/*" element={<ElectionManagerAppLayout><ElectionManager /></ElectionManagerAppLayout>} />

        {/* SystemAdmin Routes */}
        <Route path="/system-admin/*" element={<SystemAdminApp />} />
      </Routes>
    </Router>
  );
}

function VoterApp() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/election-results' element={<ElectionResults />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/election-voting' element={<Voting />} />
      </Routes>
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

export default App;
