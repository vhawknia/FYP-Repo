/* for election manager */

import React, { useState } from "react";
import './VoterEmailModal.css';

function VoterEmailModal( {isOpen, onClose, onSave} ){
    const [voterEmail, setVoterEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave( {voterEmail} );
        onClose();
    }

    if (!isOpen) return null;

    return(
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Voter by Email</h2>
                    <button onClick={onClose} className="close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Email
                    </label>
                    <input type="email" value = {voterEmail} onChange={e => setVoterEmail(e.target.value)} required />
                    <div className="button-container">
                        <button className='submitButton' onClick={handleSubmit}>Add</button>
                        <button className='submitButtonCSV' onClick={handleSubmit}>Upload CSV</button>

                    </div>
                </form>
            </div>
        </div>
    )
}


export default VoterEmailModal;

