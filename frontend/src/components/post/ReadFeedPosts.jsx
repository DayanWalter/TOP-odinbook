import { useEffect, useState } from 'react';

const ReadFeedPosts = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeed = async () => {
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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      try {
        // Set loading state to true, indicating the start of the API request
        setLoading(true);

        // Make the GET request to get the feed
        const response = await fetch('/api/post/feed', requestOptions);

        // Throw an error if the response indicates a failure
        if (!response.ok) {
          throw new Error('Failed to fetch feed data');
        }

        // Parse the JSON data from the successful response
        const data = await response.json();
        setFeed(data.feed);
      } catch (error) {
        // Set the error state to display an error message
        setError('Error fetching feed data. Please try again.');
        console.error('Error fetching feed data:', error);
      } finally {
        // Set loading state to false, indicating the end of the API request
        setLoading(false);
      }
    };

    // Invoke the fetchFeedData function when the component mounts
    fetchFeed();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>Feed Component</h2>
      {loading ? (
        <p>Loading feed...</p>
      ) : error ? (
        <p>{error}</p>
      ) : feed ? (
        <ul>
          {/* Map through feedData to display each post */}
          {feed.map((post) => (
            <li key={post._id}>{post.content}</li>
          ))}
        </ul>
      ) : (
        <p>No feed data available.</p>
      )}
    </div>
  );
};

export default ReadFeedPosts;
