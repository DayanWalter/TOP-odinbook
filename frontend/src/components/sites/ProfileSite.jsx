import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import UpdateUser from '../user/UpdateUser';

export default function ProfileSite() {
  const [userData, setUserData] = useState(null);
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
      } catch (error) {
        console.error('Error while fetching user:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>ProfileSite</div>
      <h1>User Profile:</h1>
      <p>ID: {userData._id}</p>
      <p>Name: {userData.user_name}</p>
      <p>Email: {userData.email}</p>
      <button>Follow</button>
      <button>UnFollow</button>
      <button>Private Message</button>
    </div>
  );
}
