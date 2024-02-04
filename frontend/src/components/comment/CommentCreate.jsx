import { useState } from 'react';

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateComment = async () => {
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
        `http://localhost:3000/api/comment/${postId}/create`,
        requestOptions
      );

      // Throw an error if the response indicates a failure
      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }

      // Parse the JSON data from the successful response
      const data = await response.json();
      console.log('New comment created:', data);
      // Reset the content state after successful comment creation
      setContent('');
    } catch (error) {
      // Set the error state to display an error message
      setError('Error during comment creation. Please try again.');
      console.error('Error during comment creation:', error);
    } finally {
      // Set loading state to false, indicating the end of the API request
      setLoading(false);
    }
  };
  const handleChange = (e) => setContent(e.target.value);

  return (
    <div>
      <h1>Create a New Comment:</h1>
      <form>
        <label>
          Content:
          <textarea value={content} onChange={handleChange} />
        </label>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button onClick={handleCreateComment} disabled={loading}>
        {loading ? 'Creating Comment...' : 'Create Comment'}
      </button>
    </div>
  );
}
