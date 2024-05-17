import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './SummaryPage3.css';

function Summary3() {    
    const electionUrl = 'https://example.com/election/512093';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(electionUrl).then(() => {
            alert('URL copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const createElection = () => {
        alert('Election Created!');
    };

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
                        </div>

                        <button className="create-election-button" onClick={createElection}>Create Election</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Summary3;
