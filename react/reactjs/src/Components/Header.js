import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/vote'>Vote</Link>
                <a href="#home">Home</a>
                <a href="#results">Election Results</a>
                <a href="#settings">Account Settings</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#logout">Logout</a>
            </nav>
        </header>
    );
}

export default Header;