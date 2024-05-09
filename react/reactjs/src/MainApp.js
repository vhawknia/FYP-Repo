import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import VotingBox from './Components/VotingBox';
import EndElection from './Components/EndElectionBox';

import './MainApp.css';

function MainApp() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vote" element={
                            <>
                                <h1>Gabriel Chung - IT Dept</h1>
                                <h2>Voting</h2>
                                <p>Election 1 - Election Manager: xxx</p>
                                <VotingBox name="Jason Tan" department="Marketing Dept" />
                                <VotingBox name="Naomi Chow" department="Sales Dept" />
                                <EndElection />
                            </>
                        } />
                        <Route path="/end-election" element={<EndElection />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default MainApp;

// Home component as a placeholder for your default route
function Home() {
    return (
        <div>
            <h1>Welcome to the Election Portal</h1>
            <p>Select an option from the menu.</p>
        </div>
    );
}
