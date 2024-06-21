import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the login page after 3 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        // Cleanup the timer if the component is unmounted before the timeout
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>Logged out!</h1>
            <p>You will be redirected to the login page shortly.</p>
        </div>
    );
}

export default Logout;
