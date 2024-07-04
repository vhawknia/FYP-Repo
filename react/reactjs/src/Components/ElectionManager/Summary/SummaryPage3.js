import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import './SummaryPage3.css';
import { useNavigate } from "react-router-dom";

function Summary3({ formData }) {    
    const [isCopied, setIsCopied] = useState(false);
    const electionUrl = 'https://example.com/election/512093';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(electionUrl).then(() => {
            setIsCopied(true);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };   

    const navigate = useNavigate();

    const createElection = () => {
        if (formData.title === '' || formData.description === '' || formData.startDate === '' ||
            formData.endDate === '' || formData.candidates.length === 0 || formData.voters.length === 0 ||
            formData.votersDept.length === 0) {
                alert("Your election is still missing some empty fields. Please fill them up");
        } else {
            navigate('/election-manager/');
        }
    }

    const handleNavigate = () =>{
        navigate('/election-manager/summary-2');
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="summary-page3">
                    <Sidebar />
                    <main className="summary-page3-content">
                        <h1>Election Status</h1>
                        <select id="election-status" >
                            <option value="scheduled">Scheduled</option>
                        </select>

                        <div className="election-url">
                            <h1>Election URL</h1>
                            <div className="url-container">
                                <input type="text" value={electionUrl} readOnly className="url-input" />
                                <button onClick={copyToClipboard} className="copy-button">Copy Link</button>
                            </div>
                            <p className="url-note">The URL will not be accessible until after the election has been launched.</p>
                            {isCopied && <p className="copied-message">URL copied to clipboard!</p>}
                        </div>

                        <div className="summary3-button-container">
                            <button className="create-election-button" onClick={()=>{ createElection();}}>Create Election</button>
                            <button className="create-election-button" onClick={handleNavigate}>Back</button>
                        </div>
                     </main>
                </div>
            </div>
        </>
    );
}

export default Summary3;
