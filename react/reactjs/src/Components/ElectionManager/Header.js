import React from 'react';
import companyLogo from '../../company-logo.png';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/election-manager/">
                    <img src={companyLogo} alt="Company Logo" className={styles.logo} />
                </Link>
            </div>
            <div className={styles.headerText}>Election Manager 1</div>
        </header>
    );
}

export default Header;
