import { useState, useEffect } from 'react';

export default function useFetchLoggedInUser() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const userId = payload._id;

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
  }, []);
  return { data, loading, error };
}
