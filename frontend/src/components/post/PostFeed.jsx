import { useEffect, useState } from 'react';
import PostList from './PostList';

export default function PostFeed() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

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
      const response = await fetch(`${BASE_URL}/api/post/feed`, requestOptions);

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
  useEffect(() => {
    handleFetchFeed();
  }, []);

  return (
    <div
      id="feedList"
      className="w-3/4 mx-auto mt-20 bg-yellow-100 border lg:w-1/2"
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && <PostList posts={feed} />}
    </div>
  );
}
