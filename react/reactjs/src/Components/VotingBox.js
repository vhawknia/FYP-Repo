import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VotingBox({ name, department }) {
    const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
    const navigate = useNavigate();

    const handleVote = async () => {
        const response = await fetch('http://localhost:8000/vote/', {  // Adjust URL as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                candidate_name: name  // Adjust according to your needs
            })
        });

        const data = await response.json();
        console.log(data.message);  // Or handle this in your UI

        // Show popup if vote is successful
        if (response.ok) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);  // hide popup after a few seconds
                navigate('/');
            }, 3000);
        }
    };
    

    function Popup() {
        return (
            <div className="popup">
                <p>Voted for: {name}</p>
                <p>Redirecting to homepage...</p>
            </div>
        );
    }

    return (
        <div className="voting-box">
            <div className="candidate-info">
                <div className="avatar-placeholder"></div>
                <p>{name}, {department}</p>
            </div>
            <button className="vote-button" onClick={handleVote}>Vote</button>
            {showPopup && <Popup />}
        </div>
    );
}

export default VotingBox;
