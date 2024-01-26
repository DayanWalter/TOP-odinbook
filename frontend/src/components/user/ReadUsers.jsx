import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReadUsers() {
  const [usersData, setUsersData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReadUsers = async () => {
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
      setLoading(true);
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

  return (
    <div id="userList">
      <h1>User List:</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {usersData ? (
        usersData.allUsers.map((user) => (
          <li key={user._id}>
            <a href={`/user/${user._id}`}>{user.user_name}</a>
          </li>
        ))
      ) : (
        <div>Click on search button...</div>
      )}
      <button onClick={handleReadUsers} disabled={loading}>
        {loading ? 'Fetching Users Data...' : ' Get all Users Data '}
      </button>
    </div>
  );
}
