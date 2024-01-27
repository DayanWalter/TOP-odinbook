import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import FollowUser from './FollowUser';
import UnFollowUser from './UnFollowUser';

export default function ReadUserById() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFollows, setShowFollows] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`,
          requestOptions
        );
        const data = await response.json();
        setUserData(data.searchedUser);
      } catch (error) {
        console.error('Error while fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleShowFollows = () => {
    showFollows ? setShowFollows(false) : setShowFollows(true);
  };
  const handleShowFollower = () => {
    showFollower ? setShowFollower(false) : setShowFollower(true);
  };

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  {
    /* {console.log(userData.follower_id)} */
  }
  return (
    <div>
      {loading && <div>Loading...</div>}
      {userData && (
        <>
          <div>ReadUserById</div>
          <h1>User Profile:</h1>
          <p>ID: {userData._id}</p>
          <p>Name: {userData.user_name}</p>
          <p>Email: {userData.email}</p>
          <p>
            Follows:
            {showFollows &&
              userData.follows_id.map((user) => (
                <li key={user._id}>
                  <Link to={`/user/${user._id}`}>{user.user_name}</Link>
                </li>
              ))}
            <button onClick={handleShowFollows}>
              {showFollows ? 'Hide' : 'Show'}
            </button>
          </p>
          <p>
            Follower:
            {showFollower &&
              userData.follower_id.map((user) => (
                <li key={user._id}>
                  <Link to={`/user/${user._id}`}>{user.user_name}</Link>
                </li>
              ))}
            <button onClick={handleShowFollower}>
              {showFollower ? 'Hide' : 'Show'}
            </button>
          </p>

          {isFollowing ? (
            <UnFollowUser userId={userId} />
          ) : (
            <FollowUser userId={userId} />
          )}
          <button>Private Message</button>
        </>
      )}
    </div>
  );
}
