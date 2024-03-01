import { useState } from 'react';

export default function useDeleteUser() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const deleteUser = async () => {
    try {
      setLoading(true);

      // Log an error if authentication token is not available
      if (!authToken) {
        console.error('Authentication token not available.');
        setError('Authentication token not available.');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/user/delete`, {
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const responseJSON = await response.json();
    } catch (error) {
      setError(error);
    } finally {
      localStorage.setItem('authToken', '');
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
}
