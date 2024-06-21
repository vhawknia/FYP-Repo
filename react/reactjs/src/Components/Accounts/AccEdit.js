/* login comp*/

import React from 'react';
import './LoginForm.css';
//import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccListEdit from './AccListEdit';

function AccEdit() {
    const username = "";
    function handleEdit(){
    
    }
    
    return(
        <div>
            <h1>Edit accounts</h1>
            <AccListEdit />
        </div>    
    )
}

export default AccEdit
