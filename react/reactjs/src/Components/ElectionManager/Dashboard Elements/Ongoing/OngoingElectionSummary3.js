import React, { useState } from "react";
import Header from '../../Header';
import { useNavigate } from "react-router-dom";

function OngoingElectionSummary3() {    
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate('/election-manager/');
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="summary-page3">
                    <main className="summary-page3-content">
                        <h1>Election Status</h1>
                        <select id="election-status" >
                            <option value="Ongoing">Ongoing</option>
                        </select>
                        <br />
                        <br />
                        <button className="create-election-button" onClick={()=>{handleNavigate();}}>Back to Dashboard</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default OngoingElectionSummary3;
