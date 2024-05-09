import React from 'react';

function Header() {
    return (
        <header className="header">
            <nav>
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