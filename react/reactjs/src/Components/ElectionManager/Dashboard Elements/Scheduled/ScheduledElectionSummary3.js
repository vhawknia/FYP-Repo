import React, { useState } from "react";
import Header from '../../Header';
import { useNavigate } from "react-router-dom";

function ScheduledElectionSummary3() {    
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

    const handleNavigate = () =>{
        navigate('/election-manager/election-details');
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="summary-page3">
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

                        <button className="create-election-button" onClick={()=>{handleNavigate();}}>Edit Election Details</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ScheduledElectionSummary3;
