import React from 'react';
//import './LoginForm.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccListDel from './AccListDel';

function AccDel() {
    const username = "";
    
    function handleDelete(){
    
    }
    
    return(
        <div>
            <h1>Delete accounts</h1>
            <AccListDel />
        </div>
        
    )
}

export default AccDel
