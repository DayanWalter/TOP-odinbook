import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function useFetchUser() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // id from params
  const loaderData = useLoaderData();
  const userId = loaderData.userid;

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Log an error if authentication token is not available
        if (!authToken) {
          console.error('Authentication token not available.');
          setError('Authentication token not available.');
          return;
        }

        const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const responseJSON = await response.json();
        setData(responseJSON);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);
  return { data, loading, error };
}
