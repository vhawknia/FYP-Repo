import React, { useState } from "react";
import './VoterDeptModal.css';

function VoterDeptModal({ isOpen, onClose, onSave, allDepartments }) {
    const [departmentname, setDepartmentname] = useState(allDepartments[0] || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ departmentname });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="voter-dept-modal-backdrop">
            <div className="voter-dept-modal">
                <div className="voter-dept-modal-header">
                    <h2>Add Voters by Dept</h2>
                    <button onClick={onClose} className="voter-dept-close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="voter-dept-modal-form">
                    <label>
                        Department
                    </label>
                    <select value={departmentname} onChange={e => setDepartmentname(e.target.value)}>
                        {allDepartments.map(dept => (
                            <option key={dept} value={dept}>{dept} Dept</option>
                        ))}
                    </select>
                    <div className="voter-dept-button-container">
                        <button type="submit" className="voter-dept-submit-button">Add Department</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VoterDeptModal;
