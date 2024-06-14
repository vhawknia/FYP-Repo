/* login comp*/

import React from 'react';
import './LoginForm.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AccAddBulk() {
    const username = "";
    const usernames = "";
    const password = "";
    
    function handleAccAdd(){
        
    }
    
    return (
        <form onSubmit={handleAccAdd}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2"><h1> Bulk Add Accounts</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="lbl"> <label htmlFor="username">Username:</label> </td>
                                <td className="textdield"><textArea
                                      type="text"
                                      id="usernames"
                                      name="usernames"
                                      value={usernames}
                                    />
                                </td>
                            </tr>
                            
                            <tr>
                                <td className="lbl"> <label htmlFor="dpt">Department:</label> </td>
                                 <td className="inp">
                                    <select id="options" name="options" value="IT">
                                        <option value="">Choose an option</option>
                                        <option value="IT">Temp select fieldx</option>
                                        <option value="Sales"> impelement actual later </option>
                                        <option value="Finance">for loop through department list</option>
                                    </select>
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
                                <td colSpan="2"><button type="submit">Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
    )
}

export default AccAddBulk
