import { useState } from 'react';

export default function CommentCreate({
  postId,
  commentCreated,
  setCommentCreated,
}) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

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
        `${BASE_URL}/api/comment/${postId}/create`,
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
      commentCreated ? setCommentCreated(false) : setCommentCreated(true);
      // Set loading state to false, indicating the end of the API request
      setLoading(false);
    }
  };
  const handleChange = (e) => setContent(e.target.value);

  return (
    <div className="max-w-md p-5 -mt-5 bg-white border shadow-lg rounded-b-xl">
      <div>
        <label htmlFor="content">
          <input
            className="w-full mt-8 mb-5 border"
            id="content"
            value={content}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
      </div>

      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleCreateComment}
        disabled={loading}
      >
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading ? 'Creating Comment...' : 'Create Comment'}
      </button>
    </div>
  );
}
