import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate } from 'react-router-dom';

function Summary2({ formData }) {
    const navigate = useNavigate();

    const handleNavigate = (location) => {
        navigate('/election-manager/' + location);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                    <Sidebar />
                    
                    {/* For candidates */}
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>Candidates</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for candidate" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        {formData.candidates.map((candidate, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{candidate.name}</span>
                                    <span className="candidate-role">{candidate.role}</span>
                                </div>
                            </div>
                        ))}

                        {/* For voters */}
                        <div className="voter-content-summary">
                            <div className="header-search">
                                <h1>Voters</h1>
                                <div className="search-container">
                                    <input type="text" placeholder="Search for voter" />
                                    <button type="button">Search</button>
                                </div>
                            </div>

                            {formData.votersDept.map((dept, index) => (
                                <div key={index} className="dept-profile">
                                    <div className="dept-card">
                                        <span>{dept.departmentname} Department</span>
                                    </div>
                                </div>
                            ))}

                            {formData.voters.map((voter, index) => (
                                <div key={index} className="voter-profile">
                                    <div className="voter-card">
                                        <span>{voter.voterEmail}</span>
                                    </div>
                                </div>
                            ))} 
                        </div>
                        
                        <div className="summary3-button-container">
                            <button className='next-button' onClick={() => handleNavigate('summary-3')}>Next</button>
                            <button className='next-button' onClick={() => handleNavigate('summary-1')}>Back</button>
                        </div>
                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default Summary2;
