import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './ListOfVoters.css';
import VoterEmailModal from "./VoterEmailModal";
import VoterDeptModal from "./VoterDeptModal";

function ElectionManagerListOfVoters() {
    const [openModal, setOpenModal] = useState(null); // 'email' or 'dept' or null
    const [voters, setVoters] = useState([]);
    const [votersDept, setVotersDept] = useState([]);
    const [departments, setDepartments] = useState(['IT', 'Sales', 'Finance', 'HR', 'Legal', 'R&D']);

    const handleOpenModal = (type) => setOpenModal(type);
    const handleCloseModal = () => setOpenModal(null);

    const handleVoters = (voter) => {
        setVoters([...voters, voter]);
    };

    const handleDept = (dept) => {
        setVotersDept([...votersDept, dept]);
        setDepartments(prevDepartments => prevDepartments.filter(d => d !== dept.departmentname));
    };

    const filterVoters = (email) => {
        setVoters(currentVoters => currentVoters.filter(voter => voter.voterEmail !== email));
    };
    
    const filterDept = (deptname) => {
        setVotersDept(currentDeptList => currentDeptList.filter(d => d.departmentname !== deptname));
        setDepartments(prevDepartments => [...prevDepartments, deptname]); // Add department back to the list
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
                                <input type="text" placeholder="Search for candidate" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        <div className="voter-profile">
                            <div className="voter-card">
                                <span>Voter 1</span>
                                <span>Data Analyst</span>
                                <button className="remove-voter-button">Remove</button>
                            </div>
                        </div>

                        <div className="voter-profile">
                            <div className="voter-card">
                                <span>Voter 2</span>
                                <span>Data Analyst</span>
                                <button className="remove-voter-button">Remove</button>
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

                        <div className="button-container">
                            <button className="add-voter-dept-button" onClick={() => handleOpenModal('dept')}>Add by Department</button>
                            <button className="add-voter-email-button" onClick={() => handleOpenModal('email')}>Add by Email</button>
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
