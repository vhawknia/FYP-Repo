/* for election manager */

import React from "react";
import './VoterDeptModal.css';
import { useState } from "react";


function VoterDeptModal({isOpen, onClose, onSave}){
    const [departmentname, setDepartmentname] = useState('IT')

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSave({departmentname});
        onClose();
    }

    if (!isOpen) return null;

    return(
            <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Voters by Dept</h2>
                    <button onClick={onClose} className="close-button">x</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Department
                    </label>
                    <select value={departmentname} onChange={e => setDepartmentname(e.target.value)}>
                        <option value="IT">IT Dept</option>
                        <option value="Sales">Sales Dept</option>
                        <option value="Finance">Finance Dept</option>
                        <option value="HR">HR Dept</option>
                        <option value="Legal">Legal Dept</option>
                        <option value="R&D">R&D Dept</option>
                    </select>

                    <div className="button-container">
                        <button type="submit" className="submit-button">Add Department</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VoterDeptModal;