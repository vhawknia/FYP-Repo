import React, { useState } from 'react';
//import './LoginForm.css';
import './AccAdd.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AccAdd() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dpt, setDpt] = useState('');
    
    const handleAccAdd = async (event) => {
        event.preventDefault();
        
        const selectedUsertype = event.target.options.selectedIndex;
        console.log("Selected usertype:", selectedUsertype);
        
        console.log(username +" "+ password +" "+ usertype+" "+dpt)

        
        try {
            const response = await fetch('http://127.0.0.1:8000/insertAcc/', {
                method: 'POST',
                body: JSON.stringify({ usern: username, passw: password, usert: usertype, frstn: firstname, lastn: lastname, dpt: dpt}),
                headers: {
                  'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("BACKEND RETURNED WITH", data)
            alert("Account insertion was " + data.RESULT);
        } catch (error) {
            console.error('Error:', error.message); // Handle errors appropriately (display error message)
        }
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
                                    onChange={(e) => setUsername(e.target.value)}
                                    />
                                </td>
                            </tr>
                            
                            <tr>
                                <td className="lbl"> <label htmlFor="usert">Usertype:</label> </td>
                                <td className="inp">
                                    <select 
                                        id="usertype" 
                                        name="usertype"
                                        value={usertype}
                                        onChange={(e) => setUsertype(e.target.value)}
                                    >
                                        <option value="" disabled>Choose an option</option>
                                        <option value="Voter">Voter</option>
                                        <option value="Election Manager"> Election Manager </option>
                                        <option value="System Admin">System Admin</option>
                                    </select>
                                </td>
                            </tr>
                            
                            <tr>
                                <td className="lbl"> <label htmlFor="dpt">Department:</label> </td>
                                <td className="inp">
                                    <select 
                                        id="department" 
                                        name="department"
                                        value={dpt} 
                                        onChange={(e) => setDpt(e.target.value)}
                                    >
                                        <option value="" disabled>Make retrive dpt scrpt later</option>
                                        <option value="IT">IT</option>
                                        <option value="HR">HR </option>
                                        <option value="Sales">Sales</option>
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
                                    onChange={(e) => setPassword(e.target.value)}
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
