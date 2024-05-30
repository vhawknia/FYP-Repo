import React, { useState } from 'react';

const Practice = () => {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([
    'New York',
    'London',
    'Singapore',
    'Sydney',
    'Tokyo'
    // Add more items as needed
  ]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleInputChange}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Practice;
