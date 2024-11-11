import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // Store input value
  const [showData, setShowData] = useState(null); // Store API response
  const [error, setError] = useState(null); // Store error message if no show found

  // Function to fetch show details
  const fetchShowDetails = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${query}`);
      setShowData(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError('NOT FOUND...');
      setShowData(null);
    }
  };

  // Handler for the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchShowDetails();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>TV Show Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter show name..."
          style={{ padding: '20px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showData && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px', maxWidth: '600px' }}>
          <h2>{showData.name}</h2>
          <p><strong>Language:</strong> {showData.language}</p>
          <p><strong>Genres:</strong> {showData.genres.join(', ')}</p>
          <p><strong>Status:</strong> {showData.status}</p>
          <p><strong>Runtime:</strong> {showData.runtime} minutes</p>
          <p><strong>Premiered:</strong> {showData.premiered}</p>
          <p><strong>Rating:</strong> {showData.rating?.average || 'N/A'}</p>
          <p dangerouslySetInnerHTML={{ __html: showData.summary }}></p>
          {showData.image && (
            <img src={showData.image.medium} alt={showData.name} style={{ marginTop: '20px', borderRadius: '5px' }} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;