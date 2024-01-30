import { useState, useEffect } from 'react';

export default function UpdateComment({ commentId }) {
  // const [commentData, setCommentData] = useState({
  //   content: '',
  // });
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
          `http://localhost:3000/api/comment/${commentId}`,
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

  const handleUpdateComment = async () => {
    setSuccess(false);
    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(commentData),
      body: JSON.stringify({ content }),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/${commentId}/update`,
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCommentData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div>
      <h1>Update Comment:</h1>
      <form>
        <label>
          Content:
          <textarea
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // value={commentData.content}
            // onChange={handleChange}
          />
        </label>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Comment updated!</div>}
      <button onClick={handleUpdateComment}>Update Comment</button>
    </div>
  );
}
