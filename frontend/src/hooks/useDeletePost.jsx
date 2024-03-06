import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CHANGE NAME
export default function useDeletePost() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const deletePost = async (formData) => {
    try {
      setLoading(true);

      // Log an error if authentication token is not available
      if (!authToken) {
        console.error('Authentication token not available.');
        setError('Authentication token not available.');
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/post/${formData._id}/delete`,
        {
          method: `DELETE`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseJSON = await response.json();
      if (responseJSON.deletedPost) {
        setError(null);
        setLoading(false);

        return;
        // if the response is an array, set the error to this array
      } else if (responseJSON.length) {
        setError(responseJSON);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
}
