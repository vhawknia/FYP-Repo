import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import CandidateModal from "./CandidateModal";
import './CandidateProfiles.css';
import { useNavigate } from "react-router-dom";

function ElectionManagerCandidateProfiles({ formData, updateCandidates }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [candidates, setCandidates] = useState(formData.candidates);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleAddCandidate = (candidate) => {
        const updatedCandidates = [...candidates, candidate]; //variable updatedCandidates is adding the new candidate parameter into
                                                             // the existing candidates array
        setCandidates(updatedCandidates);
        updateCandidates(updatedCandidates); //updating the parent form
        handleCloseModal();
    };

    const handleRemoveCandidate = (candidateName) => {
        const updatedCandidates = candidates.filter(c => c.name !== candidateName); //removing candidate from array if it matches parameter
        setCandidates(updatedCandidates); 
        updateCandidates(updatedCandidates); //updating parent form
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (candidates.length < 2) {
            alert("You have insufficient candidates. ");
        } else {
            navigate('/election-manager/list-of-voters');
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                    <Sidebar />
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>Candidates</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for candidate" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        {candidates.map((candidate, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{candidate.name}</span>
                                    <span className="candidate-role">{candidate.role}</span>
                                    <button onClick={() => handleRemoveCandidate(candidate.name)} className="remove-candidate-button">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="candidate-profile-button-container">
                            <button 
                                type="submit" 
                                className='next-button' 
                                onClick={handleNavigate}>                              
                            Next</button>
                            <button onClick={handleOpenModal} className="add-candidate-button">
                                Add New Candidate
                            </button>
                            <CandidateModal isOpen={modalOpen} onClose={handleCloseModal} onSave={handleAddCandidate} />
                        </div>
                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default ElectionManagerCandidateProfiles;
