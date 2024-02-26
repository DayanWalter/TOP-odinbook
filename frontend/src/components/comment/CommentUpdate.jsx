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

  const handleDeleteComment = async () => {
    const authToken = localStorage.getItem('authToken');

    // Parameters for the backend request
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/comment/${commentId}/delete`,
        requestOptions
      );

      if (response.status === 200) {
        console.log('Comment deleted.');
      } else {
        console.error('Error deleting comment:', response.status);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <label htmlFor="content">
        Comment:
        <input
          className="mt-5 mb-3 ml-5 border"
          id="content"
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoComplete="off"
        />
      </label>
      <div className="flex justify-between">
        <button
          className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
          onClick={handleUpdateComment}
        >
          Update Comment
        </button>

        <button
          className="px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
          onClick={handleDeleteComment}
        >
          Delete Comment
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Comment updated!</div>}
    </>
  );
}
