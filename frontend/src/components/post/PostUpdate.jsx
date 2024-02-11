import styles from '../../css/Form.module.css';

import { useState, useEffect } from 'react';

export default function UpdatePost({ postId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      // Parameters for the backend requestr
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/post/${postId}`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error.errors[0].msg);
          return;
        }
        setContent(data.searchedPost.content);
        // setPostData(data.searchedPost);
        setError('');
      } catch (error) {
        console.error('Error while fetching post:', error);
        setError(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setSuccess(false);
    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(postData),
      body: JSON.stringify({ content }),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/post/${postId}/update`,
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

  return (
    <>
      <div className={styles.inputGroup}>
        <label htmlFor="content" className={styles.inputGroup_label}>
          Post:
        </label>
        <input
          id="content"
          className={styles.inputGroup_input}
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoComplete="off"
        />
      </div>
      <span className={styles.inputGroup_error}>Something did not work...</span>

      <button onClick={handleUpdatePost} className={styles.formBtn}>
        Update Post
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Post updated!</div>}
    </>
  );
}
