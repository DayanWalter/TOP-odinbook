import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default function ReadUserById() {
  const [userData, setUserData] = useState(null);
  const [showFollows, setShowFollows] = useState(false);

  const loaderData = useLoaderData();
  const userId = loaderData.userid;

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
          `http://localhost:3000/api/user/${userId}`,
          requestOptions
        );
        const data = await response.json();
        setUserData(data.searchedUser);
        console.log(userData);
      } catch (error) {
        console.error('Error while fetching user:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleShowFollows = () => {
    showFollows ? setShowFollows(false) : setShowFollows(true);
  };
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {console.log(userData)}
      <div>ReadUserById</div>
      <h1>User Profile:</h1>
      <p>ID: {userData._id}</p>
      <p>Name: {userData.user_name}</p>
      <p>Email: {userData.email}</p>
      <p>
        Follows:
        {userData &&
          showFollows &&
          userData.follows_id.map((user) => (
            <li key={user._id}>
              <Link to={`/user/${user._id}`}>{user.user_name}</Link>
            </li>
          ))}
        <button onClick={handleShowFollows}>
          {showFollows ? 'Hide' : 'Show'}
        </button>
      </p>
      <p>Follower:</p>
      <button>Follow</button>
      <button>UnFollow</button>
      <button>Private Message</button>
    </div>
  );
}
