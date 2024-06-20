/* login comp*/

import React, { useState, useRef } from 'react'; // Only useState needed
import './LoginForm.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function LoginForm() {
    const navigate = useNavigate();
    const loginForm = useRef(null); // Declare loginForm using useRef

    async function handleLogin(event) { // Remove uid and pw arguments 
        event.preventDefault(); // Prevent default form submission behavior

        // Access username and password from state variables
        const username = uid;
        const password = pw;

        //if (!uid || !pw) return; // Handle empty input case (optional)
        
        //const loginForm = 

        try {
            const response = await fetch('http://127.0.0.1:8000/acc/loginFunc', {
                method: 'POST',
                body: new FormData(loginForm),
            });

            const data = await response.json(); // Assuming backend returns JSON

            if (data.role === "admin") {
                navigate("/adminDashboard");
            } else if (data.role === "mngr") {
                navigate("/electionDashboard");
            } else if (data.role === "user") {
                navigate("/dashboard");
            } else {
                alert("Login failed! Please try again."); // Or display an error message
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors appropriately (display error message to user)
        }
    }

    return (
        <div className="page">
            <div className="left-div">
                
            </div>
            
            <div className="LoginForm" >
                <form ref={(el) => loginForm = el} onSubmit={handleLogin}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2"><h1>Login</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="lbl"> <label htmlFor="username">Username:</label> </td>
                                <td className="inp"><input
                                      type="text"
                                      id="uid"
                                      name="uid"
                                    />
                                </td>
                            </tr>
                            
                            <tr>
                                <td className="lbl"><label htmlFor="password">Password:</label></td>
                                <td className="inp"><input
                                    type="password"
                                    id="pw"
                                    name="pw"
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

export default LoginForm
