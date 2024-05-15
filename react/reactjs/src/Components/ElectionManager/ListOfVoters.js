/* for election manager */

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function ElectionManagerListOfVoters(){
    return (
        <>
            <Header />
            <div className="container">
                <div className="candidate-profiles-page">
                    <Sidebar />
                    <main className="candidate-content">
                        <div className="header-search">
                            <h1>Candidates</h1>
                            <div className="search-container">
                                <input type="text" placeholder="Search for candidate" />
                                <button type="button">Search</button>
                            </div>
                        </div>  
                    </main>
                </div>
            </div>
        </>
    );
}


export default ElectionManagerListOfVoters;