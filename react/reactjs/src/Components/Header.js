import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Vote">Vote</Link>
                <Link to="/endElection">End Election</Link>
                <a href="#results">Election Results</a>
                <a href="#settings">Account Settings</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#logout">Logout</a>
            </nav>
        </header>
    );
}

export default Header;