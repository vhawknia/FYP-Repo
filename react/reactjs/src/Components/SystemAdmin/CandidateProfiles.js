import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './CandidateProfiles.css';

function SysAdminCandidateProfiles() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                    <Sidebar />
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>Candidates</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for candidate" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        <div className="candidate-profile">
                            <div className="candidate-card">
                                <span className="candidate-name">Jason Lee</span>
                                <span className="candidate-role">Chief Information Officer</span>
                                <button className="remove-candidate-button">Remove</button>
                            </div>
                        </div>

                        <div className="candidate-profile">
                            <div className="candidate-card">
                                <span className="candidate-name">Thomas Soh</span>
                                <span className="candidate-role">Chief Executive Officer</span>
                                <button className="remove-candidate-button">Remove</button>
                            </div>
                        </div>

                        <button className="add-candidate-button">Add New Candidate</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default SysAdminCandidateProfiles;
