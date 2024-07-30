import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import TopicsModal from "./TopicsModal";
import './ElectionTopics.css';

function ElectionManagerElectionTopics({ formData, updateTopics }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [topics, setTopics] = useState(formData.topics);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleAddTopic = (topic) => {
        if (topics.some(t => t.name === topic.name)) {
            alert('This topic already exists.');
        } else {
            const updatedTopics = [...topics, topic];
            setTopics(updatedTopics);
            updateTopics(updatedTopics);
            handleCloseModal();
        }
    };

    const handleRemoveTopic = (topicName) => {
        const updatedTopics = topics.filter(t => t.name !== topicName);
        setTopics(updatedTopics);
        updateTopics(updatedTopics);
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (topics.length < 2) {
            alert("You have insufficient topics.");
        } else {
            navigate('/election-manager/list-of-voters');
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="topics-page">
                <Sidebar electionType={formData.electionType}/>
                    <main className="topics-content">
                        <div className="header-search">
                            <h1>Topics</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for topic" />
                                <button type="button">Search</button>
                            </div>
                        </div>

                        {topics.map((topic, index) => (
                            <div key={index} className="topic-profile">
                                <div className="topic-card">
                                    <span className="topic-name">{topic.name}</span>
                                    <button onClick={() => handleRemoveTopic(topic.name)} className="remove-topic-button">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="topics-button-container">
                            <button 
                                type="submit" 
                                className='next-button' 
                                onClick={handleNavigate}>
                                Next
                            </button>
                            <button onClick={handleOpenModal} className="add-topic-button">
                                Add New Topic
                            </button>
                            <TopicsModal isOpen={modalOpen} onClose={handleCloseModal} onSave={handleAddTopic} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ElectionManagerElectionTopics;
