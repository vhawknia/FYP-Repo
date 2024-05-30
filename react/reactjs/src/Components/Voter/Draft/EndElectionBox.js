/* for voter */

import React, { useState } from 'react';

function ElectionResults() {
    const [results, setResults] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const terminateElection = async () => {
        const response = await fetch('http://localhost:8000/terminate/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        if (response.ok) {
            setResults(data.results);
            setShowPopup(true);  // Show the popup with results
        } else {
            alert(data.message);  // Handle error response
        }
    };

    function Popup() {
        return (
            <div className="popup">
                <h3>Election Results:</h3>
                <p>Jason: {results.Jason}</p>
                <p>Naomi: {results.Naomi}</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
        );
    }

    return (
        <div className='center-container'>
            <button className='terminate-button' onClick={terminateElection}>Terminate Election</button>
            {showPopup && <Popup />}
        </div>
    );
}

export default ElectionResults;
