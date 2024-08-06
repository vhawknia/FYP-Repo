import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './Voting.css';
import avatar from '../../stock_avatar.jpg';

function Voting() {
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [candidateDetails, setCandidateDetails] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const election = location.state.election;

  const handleVoteClick = (candidate) => {
    setSelectedSubject(candidate);
    setShowVoteModal(true);
  };

  const handleCandidateClick = (candidate) => {
    setCandidateDetails(candidate);
    setShowSubjectModal(true);
  };

  const handleCloseVoteModal = () => {
    setShowVoteModal(false);
  };

  const handleCloseCandidateModal = () => {
    setShowSubjectModal(false);
  };

  const handleConfirmVote = () => {
    setShowVoteModal(false);
    setShowFinalModal(true);
    setTimeout(() => {
      navigate('/voter/', { replace: true }); // Redirect to dashboard after 3 seconds
    }, 3000);
  };

  const handleCloseRulesModal = () => {
    setShowRulesModal(false);
  };

  useEffect(() => {
    setShowRulesModal(true); // Show rules modal when component mounts
  }, []);

  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          {showRulesModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Election guidelines and Rules</h3>
                <p>xxx</p>
                <p>xxxxxx</p>
                <p>xx</p>
                <p>x</p>
                <button className='inoffensive-close-button' onClick={handleCloseRulesModal}>Next</button>
              </div>
            </div>
          )}

          {showVoteModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Vote for:</h3>
                <p>{selectedSubject.name} {selectedSubject.department}</p>
                <div className="modal-buttons">
                  <button className="yes-button" onClick={handleConfirmVote}>Yes</button>
                  <button className="no-button" onClick={handleCloseVoteModal}>No</button>
                </div>
              </div>
            </div>
          )}

          {showSubjectModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>{candidateDetails.name}</h3>
                <p>{candidateDetails.department}</p>
                <p>{candidateDetails.description}</p>
                <br></br>
                <button className="inoffensive-close-button" onClick={handleCloseCandidateModal}>Close</button>
              </div>
            </div>
          )}

          {showFinalModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Voted for:</h3>
                <p>{selectedSubject.name}, {selectedSubject.department}</p>
                <p>Redirecting to homepage.</p>
              </div>
            </div>
          )}

          
          {/* //main election screen aside from modals */}
          <h2>{election.title}</h2>
          <div className="voter-election-info">
            {election.description}
          </div>

          {/* candidates section */}
          <div className="voter-cards">
            {election.electionType === 'Candidates' && election.candidates.map(candidate => (
              <div className="candidate-voting-card" key={candidate.name} onClick={() => handleCandidateClick(candidate)}>
                <div className="voter-card-image">
                  <img src={avatar} alt="Candidate" />
                </div>
                <div className="voter-card-info">
                  <h3>{candidate.name}</h3>
                  <p>{candidate.role}</p>
                  <p>{candidate.email}</p>
                </div>
                <button className="voter-vote-button" onClick={(e) => { e.stopPropagation(); handleVoteClick(candidate); }}>Vote</button>
              </div>
            ))}
          </div>

          {/* topics section */}
          <div className="topic-cards">
            {election.electionType === 'Topics' && election.topics.map(topic => (
              <div className="topic-voting-card" key={topic.name} onClick={() => handleCandidateClick(topic)}>
                <div className="voter-card-info">
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                </div>
                <button className="voter-vote-button" onClick={(e) => { e.stopPropagation(); handleVoteClick(topic); }}>Vote</button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Voting;
