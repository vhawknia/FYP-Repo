import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './VoterApp.css'
import Dashboard from "./Components/Voter/Dashboard";
import ElectionResults from "./Components/Voter/ElectionResults";
import AccountSettings from "./Components/Voter/AccountSettings";
import PrivacyPolicy from "./Components/Voter/PrivacyPolicy";
import Logout from "./Logout";

function VoterApp() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/election-results' element={<ElectionResults />} />
          <Route path='/account-settings' element={<AccountSettings/>} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/logout' element={<Logout />} />
        </Routes> 
      </Router>
    );
  }
  
  export default VoterApp;
  