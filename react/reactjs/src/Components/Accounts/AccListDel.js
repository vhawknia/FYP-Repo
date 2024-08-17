import React, { useState, useEffect } from 'react';
import './AccListDel.css';



const GetAccList = async (cond) => {
  try {
    const response = await fetch('http://localhost:8000/getAccList/', {
      method: 'POST',
      body: JSON.stringify({ cond: cond }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    //console.log(data.data);
    return data.data; // Assuming the data is in the 'data' property of the response
  } catch (error) {
    console.error('Error fetching account list:', error);
    return []; // Return an empty array if there's an error
  }
};


const DeleteAccount = async (userid) => {
  try {
    //console.log("SENDING ACC DEL RESPONCE TO BACKEND. USERNAME IS ", usern)
    const response = await fetch('http://localhost:8000/delAcc/', {
      method: 'POST',
      body: JSON.stringify({ userid: userid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result.result; // Assuming the backend returns a 'success' field to indicate success/failure
    
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
};

function AccListDel() {
  const [cond, setCond] = useState(''); // Cond initialized as an empty string
  const [data, setData] = useState([]); // State to store fetched data
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search input

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAccList(cond); // Fetch data using the condition
      setData(result);
    };

    fetchData();
  }, [cond]); // Refetch data whenever the condition changes

  const handleSearch = () => {
    setCond(searchTerm); // Update cond when the search button is clicked
  };

  const createTR = (item) => (
  <tr key={item ? item[0] : null}> {/* Use key only if item exists */}
    {item ? (
      <>
        <td>{item[1]}</td>
        <td>{item[2]}</td>
        <td>{item[3]}</td>
        <td>{item[4]}</td>
        <td>{item[5]}</td>
        <td><button className="delBtn" onClick={() => handleDelete(item[0])}>DELETE</button></td>
      </>
    ) : (
      <td colSpan="6">No Data Found</td>
    )}
  </tr>
  );
  
  const handleDelete = async (userid) => {
  
    const confirmed = window.confirm('Are you sure you want to delete this account?');
    if (confirmed) {
        DeleteAccount(userid)
          .then((success) => {
            console.log(success)
            if (success === 'success') {
              alert('Account successfully deleted.');
              setData(data.filter((item) => item[0] !== userid)); // Remove the deleted item from the state
              //setCond(""); // Reset condition to trigger data refetch if needed
            } else {
              print(success)
              alert('Failed to delete account.');
            }
          })
          .catch((error) => {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
      });
  }
  };
  
  return (
    <div>
      <div className="searchCont">
        <table className="searchCont">
        <tbody>
          <tr>
            {/* Search bar cell */}
            <td>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as the user types
                placeholder="Search by condition..."
                className="searchBar"
              />
            </td>
            {/* Search button cell */}
            <td>
              <button onClick={handleSearch} className="searchBtn">
                Search
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      
      
      
      <table className="space-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>User Type</th>
            <th>Delete Password</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(createTR)
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AccListDel;






