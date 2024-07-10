import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import './SummaryPage3.css';
import { useNavigate } from "react-router-dom";

function Summary3({ formData, resetFormData }) {    
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

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/form-data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Form data submitted successfully:', data.message);
                resetFormData();
                alert('Election created!');
                navigate('/election-manager/');
            } else {
                console.error('Error submitting form data:', data.message);
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const createElection = () => {
        if (formData.title === '' || formData.description === '' || formData.start_date === '' 
            || formData.end_date === '' || formData.timezone === '' || formData.candidates.length === ''){
                if (formData.voters.length === 0 && formData.votersDept.length === 0)
                {
                    alert("You still have missing form fields. Please fill them up.");
                }
                else
                {
                    alert("You still have missing form fields. Please fill them up.");
                }
            }
        else{
            handleSubmit();
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
