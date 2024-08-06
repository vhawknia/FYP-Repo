/* for election manager */

import React, { useState } from "react";
import './CandidateModal.css';

function CandidateModal({ isOpen, onClose, onSave }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, role, description }); // Pass the new candidate object to the onSave function
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="candidate-modal-backdrop">
            <div className="candidate-modal">
                <div className="candidate-modal-header">
                    <h2>Add Candidate</h2>
                    <button onClick={onClose} className="candidate-close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="candidate-modal-form">
                    <label>
                        Candidate Email:
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Candidate Name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </label>
                    <label>
                        Candidate Role:
                        <input type="text" value={role} onChange={e => setRole(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                    </label>
                    <button type="submit" className="candidate-submit-button">Add Candidate</button>
                </form>
            </div>
        </div>
    );
}

export default CandidateModal;
