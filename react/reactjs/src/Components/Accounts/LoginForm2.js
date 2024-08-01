import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file for styling

function LoginForm2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://127.0.0.1:8000/loginFunc/', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log("BACKEND RETURNED WITH", data)
      //console.log("VALUE WITH PROPERTY OF KEY IS", data.RESULT)

      // Handle successful login based on data (e.g., redirect, display success message)
      if (data.RESULT === "System Admin") {
        navigate('/system-admin/');
      } else if (data.RESULT === "Election Manager") {
        navigate('/election-manager/');
      } else if (data.RESULT === "Voter") {
        navigate('/voter/');
      } else {
        alert("Login failed! Please try again."); // Or display an error message
      }
      console.log('Login successful:', data); // Replace with your logic
    } catch (error) {
      console.error('Error:', error.message); // Handle errors appropriately (display error message)
    }
  };

  return (
    <div className="page">
      <div className="left-div">
        {/* Left side content if any */}
      </div>

      <div className="LoginForm">
        <form onSubmit={handleLogin}>
          <table>
            <thead>
              <tr>
                <th colSpan="2"><h1>Login</h1></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lbl"> <label htmlFor="username">Username:</label> </td>
                <td className="inp">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="lbl"><label htmlFor="password">Password:</label></td>
                <td className="inp">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2"><button type="submit">Login</button></td>
              </tr>
              <tr>
                <td colSpan="2"> <Link to="/forgot-password">Forgot Password?</Link> </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default LoginForm2;
