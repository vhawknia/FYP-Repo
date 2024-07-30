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
            navigate('/election-manager/candidate-profiles');
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
                                    <option value="Asia/Singapore">Singapore GMT+8 (Asia/Singapore)</option>
                                    <option value="Asia/Karachi">Pakistan GMT+5 (Asia/Karachi)</option>
                                    <option value="Asia/Colombo">Sri Lanka GMT+5:30 (Asia/Colombo)</option>
                                    <option value="Asia/Kathmandu">Nepal GMT+5:45 (Asia/Kathmandu)</option>
                                    <option value="Asia/Dhaka">Bangladesh GMT+6 (Asia/Dhaka)</option>
                                    <option value="Asia/Yangon">Myanmar GMT+6:30 (Asia/Yangon)</option>
                                    <option value="Asia/Bangkok">Thailand GMT+7 (Asia/Bangkok)</option>
                                    <option value="Asia/Jakarta">Indonesia GMT+7 (Asia/Jakarta)</option>
                                    <option value="Asia/Shanghai">China GMT+8 (Asia/Shanghai)</option>
                                    <option value="Asia/Hong_Kong">Hong Kong GMT+8 (Asia/Hong_Kong)</option>
                                    <option value="Asia/Kuala_Lumpur">Malaysia GMT+8 (Asia/Kuala_Lumpur)</option>
                                    <option value="Asia/Manila">Philippines GMT+8 (Asia/Manila)</option>
                                    <option value="Asia/Seoul">Korea GMT+9 (Asia/Seoul)</option>
                                    <option value="Asia/Tokyo">Japan GMT+9 (Asia/Tokyo)</option>
                                    <option value="Australia/Adelaide">Australia (Adelaide) GMT+9:30 (Australia/Adelaide)</option>
                                    <option value="Australia/Sydney">Australia (Sydney) GMT+10 (Australia/Sydney)</option>
                                    <option value="Pacific/Port_Moresby">Papua New Guinea GMT+10 (Pacific/Port_Moresby)</option>
                                    <option value="Pacific/Guadalcanal">Solomon Islands GMT+11 (Pacific/Guadalcanal)</option>
                                    <option value="Pacific/Noumea">New Caledonia GMT+11 (Pacific/Noumea)</option>
                                    <option value="Pacific/Fiji">Fiji GMT+12 (Pacific/Fiji)</option>
                                    <option value="Pacific/Auckland">New Zealand GMT+12 (Pacific/Auckland)</option>
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
