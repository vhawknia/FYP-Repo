import React from 'react';
import Header from './Components/Header'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotingBox from './Components/VotingBox';
import Home from './Components/Home';
import EndElection from './Components/EndElectionBox';
import './MainApp.css';


function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/vote' element={
                            <>
                            <h1>Gabriel Chung - IT Dept</h1>
                            <h2>Voting</h2>
                            <p>Election 1 - Election Manager: xxx</p>
                            <VotingBox name="Jason Tan" department="Marketing Dept" />
                            <VotingBox name="Naomi Chow" department="Sales Dept" />
                            <EndElection />
                            </>
                        }>
                        </Route>  
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;