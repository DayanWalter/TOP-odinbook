import { useState, useEffect } from 'react';

export default function UpdatePost({ postId }) {
  const [postData, setPostData] = useState({
    content: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const userId = payload._id;

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
          `http://localhost:3000/api/post/${postId}`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error.errors[0].msg);
          return;
        }
        setPostData(data.searchedPost);
        setError('');
      } catch (error) {
        console.error('Error while fetching post:', error);
        setError(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleUpdatePost = async () => {
    setSuccess(false);
    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/post/${postId}/update`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      //   // Save the token, e.g., in local storage
      //   localStorage.setItem('authToken', data.token);

      console.log('Post updated:', data);
      setError('');
    } catch (error) {
      console.error('Error while updating post:', error);
      setError(error);
    }
    setSuccess(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Update Post:</h1>
      <label>
        Content:
        <input
          type="text"
          name="content"
          value={postData.content}
          onChange={handleChange}
        />
      </label>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Post updated!</div>}
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
}
