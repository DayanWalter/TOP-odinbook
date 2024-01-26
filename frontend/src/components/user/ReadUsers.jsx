import { useState, useEffect } from 'react';

export default function ReadUsers() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');

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
          'http://localhost:3000/api/user/all',
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error.errors[0].msg);
          return;
        }

        setUsersData(data);
      } catch (error) {
        console.error('Error while fetching users:', error);
        setError('Error during fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List:</h1>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {usersData.allUsers.map((user) => (
            <li key={user._id}>{user.user_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

{
  /* {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          usersData.allUsers.map((user) => (
            <li key={user._id}>{user.user_name}</li>
          ))
        )} */
}
