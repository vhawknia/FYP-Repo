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
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const navigate = useNavigate();

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowVoteModal(true);
  };

  const handleCloseVoteModal = () => {
    setShowVoteModal(false);
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
                <p>{selectedCandidate}</p>
                <div className="modal-buttons">
                  <button className="yes-button" onClick={handleConfirmVote}>Yes</button>
                  <button className="no-button" onClick={handleCloseVoteModal}>No</button>
                </div>
              </div>
            </div>
          )}
          {showFinalModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Voted for:</h3>
                <p>{selectedCandidate}</p>
                <p>Redirecting to homepage.</p>
              </div>
            </div>
          )}
          <h2>Voting</h2>
          <div className="voter-election-info">
            Election 1 - Election Manager: xxx
          </div>
          <div className="voter-candidates">
            <div className="voter-candidate">
              <div className="voter-candidate-image">
                <img src={avatar} alt="Candidate" />
              </div>
              <div className="voter-candidate-info">
                <div>Jason Tan,</div>
                <div>Marketing Dept</div>
              </div>
              <button className="voter-vote-button" onClick={() => handleVoteClick('Jason Tan, Marketing Dept')}>Vote</button>
            </div>
            <div className="voter-candidate">
              <div className="voter-candidate-image">
                <img src={avatar} alt="Candidate" />
              </div>
              <div className="voter-candidate-info">
                <div>Naomi Chow,</div>
                <div>Sales Dept</div>
              </div>
              <button className="voter-vote-button" onClick={() => handleVoteClick('Naomi Chow, Sales Dept')}>Vote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voting;
