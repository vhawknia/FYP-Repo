import React, { useState } from "react";
import './CandidateModal.css';

function Modal({ isOpen, onClose, onSave }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, role }); // Pass the new candidate object to the onSave function
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Candidate</h2>
                    <button onClick={onClose} className="close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
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
                    <button type="submit" className="submit-button">Add Candidate</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
