import { useState } from 'react';

export default function PostCreate() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    // Log an error if authentication token is not available
    if (!authToken) {
      console.error('Authentication token not available.');
      return;
    }

    // Parameters for the backend request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
      },
      body: JSON.stringify({ content }),
    };

    try {
      // Set loading state to true, indicating the start of the API request
      setLoading(true);

      // Make the POST request to create a new post
      const response = await fetch(
        `${BASE_URL}/api/post/create`,
        requestOptions
      );

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }

      // Parse the JSON data from the successful response
      const data = await response.json();
      console.log('New post created:', data);
      // Reset the content state after successful post creation
      setContent('');
    } catch (error) {
      // Set the error state to display an error message
      setError('Error during post creation. Please try again.');
      console.error('Error during post creation:', error);
    } finally {
      // Set loading state to false, indicating the end of the API request
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="content">Post:</label>
          <input
            id="content"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoComplete="off"
          />
        </div>
        <span>Something did not work...</span>

        <button onClick={handleCreatePost}>Create Post</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Post created!</div>}
      </form>
    </>
  );
}
