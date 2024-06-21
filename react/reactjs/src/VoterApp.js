import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './VoterApp.css'
import Dashboard from "./Components/Voter/Dashboard";
import ElectionResults from "./Components/Voter/ElectionResults";
import AccountSettings from "./Components/Voter/AccountSettings";
import PrivacyPolicy from "./Components/Voter/PrivacyPolicy";
import Logout from "./Logout";
import Voting from "./Components/Voter/Voting";
import LoginForm from './Components/Accounts/LoginForm'; // Import LoginForm component
import AccMng from './Components/Accounts/AccMng';
import AdminDashboard from './Components/Accounts/AdminDashboard';
import AdminElectionResults from "./Components/Accounts/AdminElectionResults";


function VoterApp() {
    return (
      <Router>
        <Routes>
          <Route path='/LoginForm' element={<LoginForm />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/election-results' element={<ElectionResults />} />
          <Route path='/account-settings' element={<AccountSettings/>} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/election-voting' element={<Voting />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/AccMng' element={<AccMng />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
        </Routes> 
      </Router>
    );
  }
  
  export default VoterApp;
  
