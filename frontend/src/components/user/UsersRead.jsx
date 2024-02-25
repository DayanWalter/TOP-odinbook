import { useEffect, useState } from 'react';
import UserList from './UserList';

export default function UsersRead() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

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
      const response = await fetch(`${BASE_URL}/api/user/all`, requestOptions);
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
  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <div
      id="userList"
      className="w-3/4 mx-auto mt-20 bg-yellow-100 border xl:w-1/2 "
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {usersData && <UserList users={usersData.allUsers} />}
    </div>
  );
}
