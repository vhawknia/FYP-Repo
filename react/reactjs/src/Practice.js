import React from "react";
import { useState } from "react";

function Practice (){
    const [candidate, setCandidates] = useState([])

    const handleCandidate = (newCandidate) => {
        setCandidates([...candidate, newCandidate]);
    }

    return (
        <button onClick={handleCandidate}> Click here to add </button>
    );
}

export default Practice;