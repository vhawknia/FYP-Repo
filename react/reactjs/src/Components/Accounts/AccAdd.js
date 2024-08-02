import React from 'react';
//import './LoginForm.css';
import './AccAdd.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AccAdd() {
    const username = "";
    const password = "";
    
    function handleAccAdd(){
        
    }
    
    return (
        <div class="addForm">
            <form onSubmit={handleAccAdd}>
                <thead>
                        <tr>
                            <th colSpan="2"><h1>Add account</h1></th>
                        </tr>
                </thead>
                    <table class="table">
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
                                <td className="lbl"><label htmlFor="password">Default Password:</label></td>
                                <td className="inp"><input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><button type="submit" class="add">Add</button></td>
                            </tr>
                        </tbody>
                    </table>
            </form>
        
        </div>
    )
}

export default AccAdd
