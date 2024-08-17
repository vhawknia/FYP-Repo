import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from '../Header';
import './CompletedElections.css';
import axios from 'axios';

function CompletedElections() {
    const navigate = useNavigate();
    const location = useLocation();
    const [completedElectionsList, setCompletedElectionList] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const { election } = location.state;

    useEffect(() => {
        fetchCompletedElections();
    }, []);

    useEffect(() => {
        if (completedElectionsList.length > 0) {
            const matchingRecords = completedElectionsList.filter(item => item.election === election.id);
            setSelectedRecords(matchingRecords);
        }
    }, [completedElectionsList, election.id]);

    const fetchCompletedElections = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/completed-elections/');
            setCompletedElectionList(response.data);

            // Log the completedElectionsList to the console
            //console.log('Completed Elections List:', response.data);
        } catch (error) {
            console.error('Error fetching election data:', error);
        }
    };

    // Helper function to format the date
    function formatISODate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleArchive = async () => {
        try {
            // Define the payload for the archive request
            const archivePayload = {
                election_id: election.id,
                title: election.title,
                description: election.description,
                start_date: election.startDate,
                end_date: election.endDate,
                timezone: election.timezone,
                // Add any other fields that need to be archived
            };
    
            // Send the POST request to the API to create a record in the archivedElections table
            const response = await axios.post('http://127.0.0.1:8000/api/archived-elections/', archivePayload);
    
            if (response.status === 201) {
                // Navigate to the archived elections page after successful archival
                navigate('/election-manager/archived-elections');
            } else {
                console.error('Failed to archive the election:', response.status);
            }
        } catch (error) {
            console.error('Error archiving the election:', error);
        }
    };
    

    const chartData = selectedRecords.flatMap((record, recordIndex) => {
        if (record.candidates && record.candidates.length > 0) {
            return record.candidates.map((candidate, candidateIndex) => ({
                name: candidate.name,
                votes: recordIndex === candidateIndex ? record.tally : 0
            })).filter(entry => entry.votes > 0);
        } else if (record.topics && record.topics.length > 0) {
            return record.topics.map((topic, topicIndex) => ({
                name: topic.name,
                votes: recordIndex === topicIndex ? record.tally : 0
            })).filter(entry => entry.votes > 0);
        } else {
            return [{
                name: "Unknown",
                votes: recordIndex === 0 ? record.tally : 0
            }];
        }
    });

    const winner = chartData.length > 0 ? chartData.reduce((max, data) => {
        return data.votes > max.votes ? data : max;
    }, chartData[0]) : null; // Initialize with the first element in chartData
    
    return (
        <>
            <Header />
            <div className='container'>
                <div className="election-details-page">
                    <main className="form-content">
                        <h1>Ongoing Election - Summary</h1>
                        <div className="election-details-summary">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" value={election.title} disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" value={election.description} disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="start-date">Start Date</label>
                                <input type="text" id="start-date" name="start-date" value={formatISODate(election.startDate)} disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="end-date">End Date</label>
                                <input type="text" id="end-date" name="end-date" value={formatISODate(election.endDate)} disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="timezone">Timezone</label>
                                <input type="text" id="timezone" name="timezone" value={election.timezone} disabled />
                            </div>

                            <br />
                            <h1>Election Results</h1>
                            <div className='em-election-results'>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="votes" fill="#8884d8" />
                                </BarChart>
                                <br />

                                <div className="em-election-results-candidates">
                                    {chartData.map((data, index) => (
                                        <div key={index} className="candidate-vote-pair">
                                            <div><span>Name: {data.name}</span></div>
                                            <div><span> &nbsp;&nbsp; Votes: {data.votes}</span></div>
                                        </div>
                                    ))}
                                    {winner && (
                                        <div className="winner-announcement">
                                            <strong>Winner: {winner.name}</strong>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <br /><br /><br />
                        </div>
                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default CompletedElections;
