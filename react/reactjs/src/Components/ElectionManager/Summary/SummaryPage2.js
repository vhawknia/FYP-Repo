import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';

function Summary2({ formData }) {
    
    const [searchBar, setSearchBar] = useState("");
    const [filteredVoters, setFilteredVoters] = useState(formData.voters || []);
    const [filteredVotersDept, setFilteredVotersDept] = useState(formData.votersDept || []);
    const navigate = useNavigate();
    

    const handleNavigate = (location) => {
        navigate('/election-manager/' + location);
    };

    const handleSearch = () => {
        setFilteredVoters(formData.voters.filter(voter =>
            voter.voterEmail.toLowerCase().includes(searchBar.toLowerCase())
        ));

        setFilteredVotersDept(formData.votersDept.filter(dept =>
            dept.departmentname.toLowerCase().includes(searchBar.toLowerCase())
        ));
    }
    
    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                <Sidebar electionType={formData.electionType}/>
                    
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>{formData.electionType === 'Candidates' ? 'Candidates' : 'Topics'}</h1>
                            {/* <div className="search-container">
                                <input type="text" placeholder={`Search for ${formData.electionType.toLowerCase()}`}
                                 value={searchBar} onChange={(e) => setSearchBar(e.target.value)} />
                                <button type="button">Search</button>
                            </div> */}
                        </div>

                        {formData.electionType === 'Candidates' && formData.candidates.map((candidate, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{candidate.name}</span>
                                    <span className="candidate-role">{candidate.role}</span>
                                </div>
                            </div>
                        ))}

                        {formData.electionType === 'Topics' && formData.topics.map((topic, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{topic.name}</span>
                                </div>
                            </div>
                        ))}

                        {/* For voters */}
                        <div className="voter-content-summary">
                            <div className="header-search">
                                <h1>Voters</h1>
                                <div className="search-container">
                                    <input type="text" placeholder="Search for voter" 
                                        value={searchBar} onChange={(e) => setSearchBar(e.target.value)}/>
                                    <button type="button"onClick={handleSearch} >Search</button>
                                </div>
                            </div>

                            {filteredVotersDept.map((dept, index) => (
                                <div key={index} className="dept-profile">
                                    <div className="dept-card">
                                        <span>{dept.departmentname} Department</span>
                                    </div>
                                </div>
                            ))}

                            {filteredVoters.map((voter, index) => (
                                <div key={index} className="voter-profile">
                                    <div className="voter-card">
                                        <span>{voter.voterEmail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="summary3-button-container">
                            <button className='next-button' onClick={() => handleNavigate('summary-3')}>Next</button>
                            <button className='next-button' onClick={() => handleNavigate('summary-1')}>Back</button>
                        </div>
                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default Summary2;
