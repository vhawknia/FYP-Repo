import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from './Header';
import './CompletedElections.css';

function CompletedElections() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    }

    const candidate_data = [
        { name: 'Candidate 1', votes: 100 },
        { name: 'Candidate 2', votes: 140 },
    ];

    const voter_data = [
        { name: 'Total Participants', votes: 300},
        { name: 'Total Votes', votes: 240}
    ]

    return (
        <>
            <Header />
            <div className='container'>
                <div className="election-details-page">
                    <main className="form-content">
                        <h1>Completed Election - Summary</h1>
                        <div className="election-details-summary">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="start-date">Start Date</label>
                                <input type="datetime-local" id="start-date" name="start-date" disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="end-date">End Date</label>
                                <input type="datetime-local" id="end-date" name="end-date" disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="timezone">Timezone</label>
                                <select id="timezone" name="timezone">
                                    <option value="GMT+8">Singapore GMT+8 (Greenwich Mean Time)</option>
                                    <option value="GMT+5">Pakistan GMT+5 (Greenwich Mean Time)</option>
                                    <option value="GMT+5:30">Sri Lanka GMT+5:30 (Greenwich Mean Time)</option>
                                    <option value="GMT+5:45">Nepal GMT+5:45 (Greenwich Mean Time)</option>
                                    <option value="GMT+6">Bangladesh GMT+6 (Greenwich Mean Time)</option>
                                    <option value="GMT+6:30">Myanmar GMT+6:30 (Greenwich Mean Time)</option>
                                    <option value="GMT+7">Thailand GMT+7 (Greenwich Mean Time)</option>
                                    <option value="GMT+7">Indonesia GMT+7 (Greenwich Mean Time)</option>
                                    <option value="GMT+8">China GMT+8 (Greenwich Mean Time)</option>
                                    <option value="GMT+8">Hong Kong GMT+8 (Greenwich Mean Time)</option>
                                    <option value="GMT+8">Malaysia GMT+8 (Greenwich Mean Time)</option>
                                    <option value="GMT+8">Philippines GMT+8 (Greenwich Mean Time)</option>
                                    <option value="GMT+9">Korea GMT+9 (Greenwich Mean Time)</option>
                                    <option value="GMT+9">Japan GMT+9 (Greenwich Mean Time)</option>
                                    <option value="GMT+9:30">Australia (Adelaide) GMT+9:30 (Greenwich Mean Time)</option>
                                    <option value="GMT+10">Australia (Sydney) GMT+10 (Greenwich Mean Time)</option>
                                    <option value="GMT+10">Papua New Guinea GMT+10 (Greenwich Mean Time)</option>
                                    <option value="GMT+11">Solomon Islands GMT+11 (Greenwich Mean Time)</option>
                                    <option value="GMT+11">New Caledonia GMT+11 (Greenwich Mean Time)</option>
                                    <option value="GMT+12">Fiji GMT+12 (Greenwich Mean Time)</option>
                                    <option value="GMT+12">New Zealand GMT+12 (Greenwich Mean Time)</option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <h1>Election Results</h1>
                        <div className='em-election-results'>                            
                            <div>                        
                            <br /><br />
                            <BarChart
                                width={600}
                                height={300}
                                data={candidate_data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="votes" fill="#8884d8" />
                            </BarChart>
                            <br />
                            <div className='em-election-results-candidates'>
                                <div>Candidate 1: 100 voters</div>
                                <div>Candidate 2: 140 voters</div>
                            </div>
                            <br />
                            <div className="em-election-results-candidates-winner">Winner: Candidate 2</div>
                           
                            </div>
                            

                            <div>                             
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={voter_data}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}

                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="votes" fill="#8884d8" />
                                </BarChart>
                                <br />
                                    
                                <div className="em-election-results-vote-statistics">
                                    <div>Total participants: 300</div>
                                    <div>Total Votes: 240</div>  
                                </div>
                            </div>    
                        </div>
                                
                        <br /><br /><br />
                        <div className='archive'>
                            <button className='archive-button' onClick={()=>handleNavigate()}>Archive</button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default CompletedElections;