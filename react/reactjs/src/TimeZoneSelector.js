import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimeZoneSelector() {
  const [timeZones, setTimeZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeZones = async () => {
      setLoading(true);
      try {
        // Replace 'API_ENDPOINT' with the actual URL of the API you are using
        const response = await axios.get('hte/London');
        setTimeZones(response.data); // Adjust depending on the API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch time zones');
        setLoading(false);
      }
    };

    fetchTimeZones();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <select>
      {timeZones.map((zone, index) => (
        <option key={index} value={zone.value}>
          {zone.label} // Adjust 'value' and 'label' according to your data structure
        </option>
      ))}
    </select>
  );
}

export default TimeZoneSelector;
