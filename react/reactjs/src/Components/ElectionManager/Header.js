import React from 'react';
import companyLogo from '../../company-logo.png';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

    
function Header() {
    const navigate = useNavigate();
    const handleNavigate = (location) =>{
        navigate(location);
    }      

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/election-manager/">
                    <img src={companyLogo} alt="Company Logo" className={styles.logo} />
                </Link>
            </div>
            <button className={styles.noStyleButton} onClick={() => handleNavigate('/')}> Logout </button>
            <div className={styles.headerText}>Election Manager 1</div>
        </header>
    );
}

export default Header;
