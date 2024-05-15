import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SysAdminDashboard from "./Components/SystemAdmin/SysAdminDashboard";
import SysAdminElectionDetails from './Components/SystemAdmin/SysAdminElectionDetails';

function SysAdminApp() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<SysAdminDashboard />} />
          <Route path='/new-election' element={<SysAdminElectionDetails />} />
        </Routes>
      </Router>
    );
  }
  
  export default SysAdminApp;
  