import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './Voting.css';
import avatar from '../../stock_avatar.jpg';

function Voting() {
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidateDetails, setCandidateDetails] = useState({});
  const navigate = useNavigate();

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowVoteModal(true);
  };

  const handleCandidateClick = (candidate) => {
    setCandidateDetails(candidate);
    setShowCandidateModal(true);
  };

  const handleCloseVoteModal = () => {
    setShowVoteModal(false);
  };

  const handleCloseCandidateModal = () => {
    setShowCandidateModal(false);
  };

  const handleConfirmVote = () => {
    setShowVoteModal(false);
    setShowFinalModal(true);
    setTimeout(() => {
      navigate('/'); // Redirect to dashboard after 3 seconds
    }, 3000);
  };

  const handleCloseRulesModal = () => {
    setShowRulesModal(false);
  };

  useEffect(() => {
    setShowRulesModal(true); // Show rules modal when component mounts
  }, []);

  const candidates = [
    { name: 'Jason Tan', department: 'Marketing Dept', bio: 'Experienced marketer with a decade of expertise...', avatar: avatar },
    { name: 'Naomi Chow', department: 'Sales Dept', bio: 'Top-performing sales manager...', avatar: avatar }
  ];

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
                <button onClick={handleCloseRulesModal}>Next</button>
              </div>
            </div>
          )}
          {showVoteModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Vote for:</h3>
                <p>{selectedCandidate.name}, {selectedCandidate.department}</p>
                <div className="modal-buttons">
                  <button className="yes-button" onClick={handleConfirmVote}>Yes</button>
                  <button className="no-button" onClick={handleCloseVoteModal}>No</button>
                </div>
              </div>
            </div>
          )}
          {showCandidateModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>{candidateDetails.name}</h3>
                <p>{candidateDetails.department}</p>
                <img src={candidateDetails.avatar} alt="Candidate" className="candidate-avatar"/>
                <p>{candidateDetails.bio}</p>
                <br></br>
                <button onClick={handleCloseCandidateModal}>Close</button>
              </div>
            </div>
          )}
          {showFinalModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Voted for:</h3>
                <p>{selectedCandidate.name}, {selectedCandidate.department}</p>
                <p>Redirecting to homepage.</p>
              </div>
            </div>
          )}
          <h2>Voting</h2>
          <div className="voter-election-info">
            Election 1
          </div>
          <div className="voter-candidates">
            {candidates.map(candidate => (
              <div className="voter-candidate" key={candidate.name} onClick={() => handleCandidateClick(candidate)}>
                <div className="voter-candidate-image">
                  <img src={candidate.avatar} alt="Candidate" />
                </div>
                <div className="voter-candidate-info">
                  <div>{candidate.name},</div>
                  <div>{candidate.department}</div>
                </div>
                <button className="voter-vote-button" onClick={(e) => { e.stopPropagation(); handleVoteClick(candidate); }}>Vote</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voting;
