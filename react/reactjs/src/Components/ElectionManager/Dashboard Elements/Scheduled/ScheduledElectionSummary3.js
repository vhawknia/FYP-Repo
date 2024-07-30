import React, { useState } from "react";
import Header from '../../Header';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function ScheduledElectionSummary3() {    
    const [isCopied, setIsCopied] = useState(false);
    const electionUrl = 'https://example.com/election/512093';
    const navigate = useNavigate();
    const location = useLocation();
    const { election } = location.state;

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/elections/${election.id}/`);
            alert('Election deleted successfully');
            navigate('/election-manager'); // Redirect to the election manager dashboard
        } catch (error) {
            console.error('Error deleting election:', error);
            alert('Failed to delete election');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="summary-page3">
                    <main className="summary-page3-content">
                        <h1>Election Status</h1>
                        <select id="election-status" value={election.status} disabled>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <br /><br /><br />
                        <button className="next-button" onClick={handleDelete}>Delete Election</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ScheduledElectionSummary3;
