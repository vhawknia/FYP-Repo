/* for election manager */

import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import './ListOfVoters.css';
import VoterEmailModal from "./VoterEmailModal";
import VoterDeptModal from "./VoterDeptModal";
import { useNavigate } from "react-router-dom";

function ElectionManagerListOfVoters( {formData, updateVoters} ) {
    const [openModal, setOpenModal] = useState(null); // 'email' or 'dept' or null
    const [voters, setVoters] = useState(formData.voters);
    const [votersDept, setVotersDept] = useState(formData.votersDept);
    const [departments, setDepartments] = useState(['IT', 'Sales', 'Finance', 'HR', 'Legal', 'R&D']);

    const handleOpenModal = (type) => setOpenModal(type);
    const handleCloseModal = () => setOpenModal(null);

    const handleVoters = (voter) => {
        const updatedVoters = [...voters, voter];
        setVoters(updatedVoters);
        updateVoters('voters', updatedVoters);
    };

    const handleDept = (dept) => {
        const updatedDept = [...votersDept, dept];
        setVotersDept(updatedDept);
        updateVoters('votersDept', updatedDept);
        setDepartments(prevDepartments => prevDepartments.filter(d => d !== dept.departmentname));
    };

    const filterVoters = (email) => {
        const updatedVoters = voters.filter(voter => voter.voterEmail !== email);
        setVoters(updatedVoters);
        updateVoters('voters', updatedVoters);
    };
    
    const filterDept = (deptname) => {
        const updatedDept = votersDept.filter(d => d.departmentname !== deptname);
        setVotersDept(updatedDept);
        updateVoters('votersDept', updatedDept);
        setDepartments(prevDepartments => [...prevDepartments, deptname]); // Add department back to the list
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (voters.length < 2 && votersDept.length === 0) {
            alert('You have insufficient voters');
        } else {
            navigate('/election-manager/summary-1');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="list-of-voters-page">
                    <Sidebar />
                    <main className="voter-content">
                        <div className="header-search">
                            <h1>Voters</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for voter" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        {votersDept.map((dept, index) => (
                            <div key={index} className="dept-profile">
                                <div className="dept-card">
                                    <span>{dept.departmentname} Department</span>  
                                    <button className="remove-voter-button" onClick={() => filterDept(dept.departmentname)}>Remove</button>
                                </div>
                            </div>
                        ))}

                        {voters.map((voter, index) => (
                            <div key={index} className="voter-profile">
                                <div className="voter-card">
                                    <span>{voter.voterEmail}</span>  
                                    <button className="remove-voter-button" onClick={() => filterVoters(voter.voterEmail)}>Remove</button>
                                </div>
                            </div>
                        ))}

                        <div className="list-of-voters-button-container">
                            <button type="submit" className='next-button' onClick={handleNavigate}>Next</button>
                            <div className="list-of-voters-button-container-2">
                                <button className="add-voter-dept-button" onClick={() => handleOpenModal('dept')}>Add by Department</button>
                                <button className="add-voter-email-button" onClick={() => handleOpenModal('email')}>Add by Email</button>
                            </div>                        
                            {openModal === 'dept' && (
                                <VoterDeptModal
                                    isOpen={true}
                                    onClose={handleCloseModal}
                                    onSave={handleDept}
                                    allDepartments={departments}
                                />
                            )}
                            {openModal === 'email' && (
                                <VoterEmailModal
                                    isOpen={true}
                                    onClose={handleCloseModal}
                                    onSave={handleVoters}
                                />
                            )}

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ElectionManagerListOfVoters;
