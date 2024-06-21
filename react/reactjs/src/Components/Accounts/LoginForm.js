/* login comp*/

import React from 'react';
import './LoginForm.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();  
    const username = "";
    const password = "";
    
    function handleLogin() { //for now link to "/"
        navigate('/'); 
    }

    return (
        <div className="page">
            <div className="left-div">
                
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
                                <td className="inp"><input
                                      type="text"
                                      id="username"
                                      name="username"
                                      value={username}
                                    />
                                </td>
                            </tr>
                            
                            <tr>
                                <td className="lbl"><label htmlFor="password">Password:</label></td>
                                <td className="inp"><input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
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
