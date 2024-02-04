import { useState } from 'react';
import UserList from './UserList';

export default function UsersRead() {
  const [usersData, setUsersData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReadUsers = async () => {
    const authToken = localStorage.getItem('authToken');

    // Log an error if authentication token is not available
    if (!authToken) {
      console.error('Authentication token not available.');
      setError('Authentication token not available.');
      return;
    }
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
      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      const data = await response.json();

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
        <UserList users={usersData.allUsers} />
      ) : (
        <div>Click on search button...</div>
      )}
      <button onClick={handleReadUsers} disabled={loading}>
        {loading ? 'Fetching Users Data...' : ' Get all Users Data '}
      </button>
    </div>
  );
}
