/* for election manager */

import Header from '../../Header';
import { useNavigate, useLocation } from 'react-router-dom';

function ScheduledElectionSummary2() {    
    const navigate = useNavigate();
    const location = useLocation();
    const { election } = location.state;

    const handleNavigate = () =>{
        navigate('/election-manager/scheduled-election-summary3' , { state: { election } });
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>{election.electionType === 'Candidates' ? 'Candidates' : 'Topics'}</h1>
                            <div className="search-container">
                                <input type="text" placeholder={`Search for ${election.electionType.toLowerCase()}`} />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        {election.electionType === 'Candidates' && election.candidates.map((candidate, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{candidate.name}</span>
                                    <span className="candidate-role">{candidate.role}</span>
                                </div>
                            </div>
                        ))}

                        {election.electionType === 'Topics' && election.topics.map((topic, index) => (
                            <div key={index} className="candidate-profile">
                                <div className="candidate-card">
                                    <span className="candidate-name">{topic.name}</span>
                                </div>
                            </div>
                        ))}

                        <div className="voter-content-summary">
                            <div className="header-search">
                                <h1>Voters</h1>
                                <div className="search-container">
                                    <input type="text" placeholder="Search for voter" />
                                    <button type="button">Search</button>
                                </div>
                            </div>

                            {election.votersDept.map((dept, index) => (
                                <div key={index} className="dept-profile">
                                    <div className="dept-card">
                                        <span>{dept.departmentname} Department</span>
                                    </div>
                                </div>
                            ))}

                            {election.voters.map((voter, index) => (
                                <div key={index} className="voter-profile">
                                    <div className="voter-card">
                                        <span>{voter.voterEmail}</span>
                                        <span>{voter.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button type="submit" className='next-button' onClick={handleNavigate}>Next</button>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ScheduledElectionSummary2;