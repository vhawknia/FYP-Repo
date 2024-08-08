import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NewHeader from './NewHeader';
import Sidebar from './Sidebar';
import './Voting.css';
import avatar from '../../stock_avatar.jpg';  
import forge from 'node-forge';

function Voting() {
  // State for various modals
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjectDetails, setSubjectDetails] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const election = location.state.election;

  // State to store generated keys
  const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });

  // useRef to track if keys have been generated
  const keysGeneratedRef = useRef(false);

  // Function to handle vote button click
  const handleVoteClick = (subject) => {
    setSelectedSubject(subject);
    setShowVoteModal(true);
  };

  // Function to handle candidate card click
  const handleSubjectClick = (subject) => {
    setSubjectDetails(subject);
    setShowSubjectModal(true);
  };

  // Function to close vote modal
  const handleCloseVoteModal = () => {
    setShowVoteModal(false);
  };

  // Function to close candidate details modal
  const handleCloseCandidateModal = () => {
    setShowSubjectModal(false);
  };

  // Function to confirm vote
  const handleConfirmVote = () => {
    // Ensure the public key is available
    if (!keys.publicKey) {
      console.error('Public key not available');
      return;
    }

    // Collect the vote data
    const voteData = {
      subject: selectedSubject,
      //candidate : name, email, role, description
      //topic: name, description
    };

    // Submit the vote with the vote data and the public key
    submitVote(voteData, keys.publicKey);

    // Close the vote modal and show the final confirmation modal
    setShowVoteModal(false);
    setShowFinalModal(true);

    // Redirect to the dashboard after 3 seconds
    setTimeout(() => {
      navigate('/voter/', { replace: true });
    }, 3000);
  };

  // Function to close rules modal
  const handleCloseRulesModal = () => {
    setShowRulesModal(false);
  };

  // useEffect to show rules modal on component mount and generate keys
  useEffect(() => {
    setShowRulesModal(true); // Show rules modal when component mounts
    if (!keysGeneratedRef.current) {
      generateKeys(); // Generate keys only if they haven't been generated yet
      keysGeneratedRef.current = true; // Mark keys as generated
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to generate RSA keys
  const generateKeys = async () => {
    const { pki } = forge;
    const { rsa } = pki;

    try {
      // Generate RSA key pair asynchronously
      const keypair = await new Promise((resolve, reject) => {
        rsa.generateKeyPair({ bits: 2048, e: 0x10001 }, (err, keypair) => {
          if (err) {
            reject(err);
          } else {
            resolve(keypair);
          }
        });
      });

      // Convert keys to PEM format
      const publicKeyPem = pki.publicKeyToPem(keypair.publicKey);
      const privateKeyPem = pki.privateKeyToPem(keypair.privateKey);

      // Set generated keys in state
      setKeys({ publicKey: publicKeyPem, privateKey: privateKeyPem });
      console.log({ publicKey: publicKeyPem, privateKey: privateKeyPem });
      console.log('Keys should have been generated');
    } catch (err) {
      console.error('Error generating keys:', err);
    }
  };

  // Function to submit the vote
  const submitVote = async (voteData, publicKey) => {
    try {
      const response = await fetch('http://localhost:8000/api/handle_Vote/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteData, publicKey }),
      });
      const result = await response.json();
      console.log('Vote submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };
  

  return (
    <div className="voter-app-container">
      <NewHeader />
      <div className="voter-main-content">
        <Sidebar />
        <div className="voter-content">
          {/* Rules modal */}
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

          {/* Vote confirmation modal */}
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

          {/* Subject details modal -- contains the details or description of the candidate/topic */}
          {showSubjectModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>{subjectDetails.name}</h3>
                <p>{subjectDetails.department}</p>
                <p>{subjectDetails.description}</p>
                <br></br>
                <button className="inoffensive-close-button" onClick={handleCloseCandidateModal}>Close</button>
              </div>
            </div>
          )}

          {/* Vote confirmation modal */}
          {showFinalModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Voted for:</h3>
                <p>{selectedSubject.name}, {selectedSubject.department}</p>
                <p>Redirecting to homepage.</p>
              </div>
            </div>
          )}

          {/* Main election screen aside from modals */}
          <h2>{election.title}</h2>
          <div className="voter-election-info">
            {election.description}
          </div>

          {/* Candidates section */}
          <div className="voter-cards">
            {election.electionType === 'Candidates' && election.candidates.map(candidate => (
              <div className="candidate-voting-card" key={candidate.name} onClick={() => handleSubjectClick(candidate)}>
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

          {/* Topics section */}
          <div className="topic-cards">
            {election.electionType === 'Topics' && election.topics.map(topic => (
              <div className="topic-voting-card" key={topic.name} onClick={() => handleSubjectClick(topic)}>
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
