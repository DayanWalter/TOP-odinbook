import { useState } from 'react';

export default function useCreatePost() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (formData) => {
    const authToken = localStorage.getItem('authToken');
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
        },
        body: JSON.stringify({ formData }),
      });

      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
}
