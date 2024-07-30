/* for election manager */

import React from "react";
import './Sidebar.css';
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({electionType}) {
    const navigate = useNavigate();
    const location = useLocation();  // Access location details

    // Function to navigate and ignore setting active state manually
    const handleNavigate = (navigatePath) => {
        navigate('/election-manager/' + navigatePath); // Navigate to the path provided
    }

    return (
        <aside className="election-manager-sidebar">
            <h1>New Election</h1>
            <ul>
                <li className={location.pathname === "/election-details" ? "active" : ""}
                    onClick={() => handleNavigate("election-details")}>
                    Election Details
                </li>
                {electionType === 'Candidates' && <li className={location.pathname === "/candidate-profiles" ? "active" : ""}
                    onClick={() => handleNavigate("candidate-profiles")}>
                    Candidate Profiles
                </li>}
                {electionType === 'Topics' &&<li className={location.pathname === "/election-topics" ? "active" : ""}
                    onClick={() => handleNavigate("election-topics")}>
                        Election Topics
                </li>}
                <li className={location.pathname === "/list-of-voters" ? "active" : ""}
                    onClick={() => handleNavigate("list-of-voters")}>
                    List of Voters
                </li>
                <li className={location.pathname === "/summary-1" ? "active" : ""}
                    onClick={() => handleNavigate("summary-1")}>
                    Summary
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
