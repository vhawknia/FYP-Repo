import React, { useState } from "react";
import './VoterEmailModal.css';

function VoterEmailModal({ isOpen, onClose, onSave }) {
    const [voterEmail, setVoterEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ voterEmail });
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="voter-email-modal-backdrop">
            <div className="voter-email-modal">
                <div className="voter-email-modal-header">
                    <h2>Add Voter by Email</h2>
                    <button onClick={onClose} className="voter-email-close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="voter-email-modal-form">
                    <label>
                        Email
                    </label>
                    <input
                        type="email"
                        value={voterEmail}
                        onChange={e => setVoterEmail(e.target.value)}
                        placeholder="Email here"
                        required
                    />
                    <div className="voter-email-button-container">
                        <button type="submit" className='voter-email-submitButton'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VoterEmailModal;
