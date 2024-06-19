/* for election manager */

import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate } from 'react-router-dom';

function Summary2() {    
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate('/summary-3')
    }

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
                                <span className="candidate-name">James Lee</span>
                                <span className="candidate-role">Chief Information Officer</span>
                            </div>
                        </div>
                            
                        <div className="candidate-profile">
                            <div className="candidate-card">
                                <span className="candidate-name">Thomas Soh</span>
                                <span className="candidate-role">Chief Executive Officer</span>
                            </div>
                        </div>

                        <div className="voter-content-summary">
                            <div className="header-search">
                                <h1>Voters</h1>
                                <div className="search-container">
                                    <input type="text" placeholder="Search for voter" />
                                    <button type="button">Search</button>
                                </div>
                            </div>

                            <div className="voter-profile">
                                <div className="voter-card">
                                    <span>Voter 1</span>
                                    <span>Data Analyst</span>
                                </div>
                            </div>

                            <div className="voter-profile">
                                <div className="voter-card">
                                    <span>Voter 2</span>
                                    <span>Data Analyst</span>
                                </div>
                            </div>
                        </div>
                        
                        <button className='next-button' onClick={()=>handleNavigate()}>Next</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Summary2;