import { useState, useEffect } from 'react';

export default function CommentUpdate({ commentId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [content, setContent] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      // Parameters for the backend request
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/comment/${commentId}`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error.errors[0].msg);
          return;
        }
        setContent(data.searchedComment.content);

        // setCommentData(data.searchedComment);
        setError('');
      } catch (error) {
        console.error('Error while fetching comment:', error);
        setError(error);
      }
    };

    fetchData();
  }, [commentId]);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    setSuccess(false);
    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/comment/${commentId}/update`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      //   // Save the token, e.g., in local storage
      //   localStorage.setItem('authToken', data.token);

      console.log('Comment updated:', data);
      setError('');
    } catch (error) {
      console.error('Error while updating comment:', error);
      setError(error);
    }
    setSuccess(true);
  };

  return (
    <>
      <div>
        <label htmlFor="content">Comment:</label>
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

      <button onClick={handleUpdateComment}>Update Comment</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Comment updated!</div>}
    </>
  );
}
