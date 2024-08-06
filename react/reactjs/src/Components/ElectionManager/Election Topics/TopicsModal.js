import React, { useState } from "react";
import './TopicsModal.css';

function TopicsModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description }); // Pass the new topic object to the onSave function
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="topic-modal-backdrop">
            <div className="topic-modal">
                <div className="topic-modal-header">
                    <h2>Add Topic</h2>
                    <button onClick={onClose} className="topic-close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="topic-modal-form">
                    <label>
                        Topic Name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                    </label>
                    <button type="submit" className="topic-submit-button">Add Topic</button>
                </form>
            </div>
        </div>
    );
}

export default TopicsModal;
