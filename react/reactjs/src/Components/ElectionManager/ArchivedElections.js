import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function ArchivedElections() {    
    const navigate = useNavigate();
    const handleNavigate = (data) =>{
        navigate('/' + data);
    }

    return(
        <>
        <Header /> 
        <div className='container'>
            <div className="election-details-page">
            <main className="form-content">

                <div className="dashboardText"><span>Archived Elections</span></div>
                
                <div className="election-item-titles">
                <div><u>Election Name</u></div>
                <div><u>Status</u></div>
                <div><u>Start Date</u></div>
                <div><u>End Date</u></div>
                </div>

                <button onClick={()=>handleNavigate('completed-election')} className="election-item">
                <div>Election Title 3</div>
                <div>Completed</div>
                <div>04/04/2024 8am</div>
                <div>10/04/2024 8am</div>
                </button>

            </main>
            </div>
        </div>

        </>
    );
}

export default ArchivedElections;
