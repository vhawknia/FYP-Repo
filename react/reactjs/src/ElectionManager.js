import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ElectionManagerDashboard from "./Components/ElectionManager/Dashboard";
import ElectionManagerElectionDetails from './Components/ElectionManager/ElectionDetails';
import ElectionManagerCandidateProfiles from "./Components/ElectionManager/Candidate Profiles/CandidateProfiles";
import ElectionManagerListOfVoters from "./Components/ElectionManager/List Of Voters/ListOfVoters";
import Summary1 from "./Components/ElectionManager/Summary/SummaryPage1";
import Summary2 from "./Components/ElectionManager/Summary/SummaryPage2";
import Summary3 from "./Components/ElectionManager/Summary/SummaryPage3";
import OngoingElectionSummary from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary";
import OngoingElectionSummary2 from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary2";
import OngoingElectionSummary3 from "./Components/ElectionManager/Dashboard Elements/Ongoing/OngoingElectionSummary3";
import ScheduledElectionSummary from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary";
import ScheduledElectionSummary2 from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary2";
import ScheduledElectionSummary3 from "./Components/ElectionManager/Dashboard Elements/Scheduled/ScheduledElectionSummary3";
import CompletedElections from "./Components/ElectionManager/CompletedElections";
import ArchivedElections from "./Components/ElectionManager/ArchivedElections";

const initialFormData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    timezone: 'GMT+8',
    candidates: [],
    voters: [],
    votersDept: []
};


function ElectionManager() {
    const [formData, setFormData] = useState(initialFormData);
    const location = useLocation();

    const updateFormData = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const updateCandidates = (candidates) => {
        setFormData(prevState => ({
            ...prevState,
            candidates: candidates
        }));
    };

    const updateVoters = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    const resetFormData = () => {
        setFormData(initialFormData);
    };

    useEffect(() => {
        // Reset form data if navigating to '/'
        if (location.pathname === '/election-manager/' || location.pathname === '/') {
            resetFormData();
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<ElectionManagerDashboard />} />
            <Route 
                path="election-details" 
                element={<ElectionManagerElectionDetails formData={formData} updateFormData={updateFormData} />} 
            />
            <Route 
                path="candidate-profiles" 
                element={<ElectionManagerCandidateProfiles formData={formData} updateCandidates={updateCandidates} />} 
            />
            <Route
                path="list-of-voters"
                element={<ElectionManagerListOfVoters formData={formData} updateVoters={updateVoters} />} />

            <Route path="summary-1" element={<Summary1 formData={formData} />} />
            <Route path="summary-2" element={<Summary2 formData={formData} />} />
            <Route path="summary-3" element={<Summary3 formData={formData} resetFormData={resetFormData} />} />
            <Route path="ongoing-election" element={<OngoingElectionSummary />} />
            <Route path="ongoing-election-summary2" element={<OngoingElectionSummary2 />} />
            <Route path="ongoing-election-summary3" element={<OngoingElectionSummary3 />} />
            <Route path="scheduled-election" element={<ScheduledElectionSummary />} />
            <Route path="scheduled-election-summary2" element={<ScheduledElectionSummary2 />} />
            <Route path="scheduled-election-summary3" element={<ScheduledElectionSummary3 />} />
            <Route path="completed-election" element={<CompletedElections />} />
            <Route path="archived-elections" element={<ArchivedElections />} />
        </Routes>
    );
}

export default ElectionManager;
