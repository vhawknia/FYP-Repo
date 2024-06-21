/* login comp*/

import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import CSRFTokenRequest from './CSRFTokenRequest';

function LoginForm2(/*{ csrfToken }*/) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  


  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://127.0.0.1:8000/loginFunc/', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json',
          //'X-CSRFToken': csrfToken, // Use the passed token here
        },
      });
      
      
      //console.log("WHAT THE FUCK IS THE BODY?", JSON.stringify({ username: username, password: password }))
      
      
      /*
      if (!response.ok) {
        console.log("RESPONSE???", response);
        throw new Error(`THIS ONE THE PROBLEM Error fetching data: ${response.status}`);
      }*/
      const data = await response.json();
      console.log("BACKEND RETURNED WITH", data)
      console.log("VALUE WITH PROPERTY OF KEY IS", data.RESULT)
      
      
      // Handle successful login based on data (e.g., redirect, display success message)
      if (data.RESULT == "admin"){
        console.log("YES IT RETURNED SUCCESSFULLY")
        navigate('/adminDashboard');
      } else if (data.RESULT == "mngr"){
        console.log("YES IT RETURNED SUCCESSFULLY")
        navigate('/');  
      } else if (data.RESULT == "user"){
        console.log("YES IT RETURNED SUCCESSFULLY")
        navigate('/');
      
      } else {
        console.log("LOGIN FAILED. REMEMBER TO IMPLEMENT FAILURE COMP")
      }
      console.log('Login successful:', data); // Replace with your logic
        
    } catch (error) {
      console.error('Error:', error.message); // Handle errors appropriately (display error message)
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm2
