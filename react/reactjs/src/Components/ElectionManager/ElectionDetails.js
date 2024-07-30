import React from 'react';
import './ElectionDetails.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

function ElectionManagerElectionDetails({ formData, updateFormData }) {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value);
    };

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

   
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (startDate >= endDate) {
            alert('The start date must be before the end date.');
        }
        else{
            if (formData.electionType === 'Candidates'){
                navigate('/election-manager/candidate-profiles');
            }
            else
            {
                navigate('/election-manager/election-topics');
            }
        }
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className="election-details-page">
                    <Sidebar />
                    <main className="form-content">
                        <h1>Election Details</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Start Date and Time</label>
                                <input
                                    type="datetime-local"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    min="2024-05-01T00:00"
                                    max="2025-05-01T00:00"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">End Date and Time</label>
                                <input
                                    type="datetime-local"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    min="2024-05-01T00:00"
                                    max="2025-05-01T00:00"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="timezone">Timezone</label>
                                <select
                                    id="timezone"
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    required
                                >
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

                            <div className="form-group">
                                <label htmlFor="electionType">Election Type</label>
                                <select
                                    id="electionType"
                                    name="electionType"
                                    value={formData.electionType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Candidates">Candidates</option>
                                    <option value="Topics">Topic</option>
                                </select>
                            </div>

                            <button type="submit" className='next-button'>Next</button>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ElectionManagerElectionDetails;
