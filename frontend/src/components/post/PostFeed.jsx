import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReadFeedPosts() {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchFeed = async () => {
    const authToken = localStorage.getItem('authToken');

    // Log an error if authentication token is not available
    if (!authToken) {
      console.error('Authentication token not available.');
      setError('Authentication token not available.');
      return;
    }

    // Parameters for the backend request
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      // Set loading state to true, indicating the start of the API request
      setLoading(true);

      // Make the GET request to get the feed
      const response = await fetch(
        'http://localhost:3000/api/post/feed',
        requestOptions
      );

      // Throw an error if the response indicates a failure
      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }

      // Parse the JSON data from the successful response
      const data = await response.json();
      setFeed(data.feed);
    } catch (error) {
      console.error('Error fetching feed data:', error);
      setError('Error fetching feed data. Please try again.');
    } finally {
      // Set loading state to false, indicating the end of the API request
      setLoading(false);
    }
  };

  return (
    <div id="feedList">
      <h2>Feed List:</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed ? (
        <ul>
          {feed.map((post) => (
            <li key={post._id}>
              <Link to={`/post/${post._id}`}>{post.content}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Click on search button...</div>
      )}
      <button onClick={handleFetchFeed} disabled={loading}>
        {loading ? 'Fetching Feed Data...' : ' Get all Feed Data '}
      </button>
    </div>
  );
}
