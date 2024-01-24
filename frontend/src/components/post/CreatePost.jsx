// Importing the 'useState' hook from React for managing state in functional components
import { useState } from 'react';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePost = async () => {
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
      body: JSON.stringify({ content }), // Convert post content to JSON and include it in the request body
    };

    try {
      // Set loading state to true, indicating the start of the API request
      setLoading(true);

      // Make the POST request to create a new post
      const response = await fetch('/api/post/create', requestOptions);

      // Throw an error if the response indicates a failure
      if (!response.ok) {
        throw new Error('Failed to create post');
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
    }
  };

  return (
    <div>
      <h1>Create a New Post:</h1>

      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button onClick={handleCreatePost} disabled={loading}>
        {loading ? 'Creating Post...' : 'Create Post'}
      </button>
    </div>
  );
};

export default CreatePost;
