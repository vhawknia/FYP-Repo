import React from 'react';
import Header from './Header'; // Ensure the path is correct based on your file structure
import VotingBox from './VotingBox';
import EndElection from './EndElectionBox';
import './MainApp.css';
function App() {
    return (
        <div className="app">
            <Header />
            <main className="content">
                <h1>Gabriel Chung - IT Dept</h1>
                <h2>Voting</h2>
                <p>Election 1 - Election Manager: xxx</p>
                <VotingBox name="Jason Tan" department="Marketing Dept" />
                <VotingBox name="Naomi Chow" department="Sales Dept" />
                <EndElection />
            </main>
        </div>
    );
}

export default App;