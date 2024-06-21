import React, { useState, useEffect } from 'react';

function CSRFTokenRequest() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/CSRFTokenDispenser/'); // Assuming your Django endpoint URL
        if (!response.ok) {
          throw new Error(`Error fetching CSRF token: ${response.status}`);
        }
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []); // Empty dependency array ensures fetching on mount

  // You can use the fetched csrfToken in your other components
  return (
    <div>
      <CSRFTokenRequest
        render={(csrfToken) => (
          <LoginForm2 csrfToken={csrfToken} /> // Pass the token as a prop
        )}
      />
    </div>
  );
}

export default CSRFTokenRequest;

