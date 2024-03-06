import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function useUserIsFollowing(user) {
  const [isFollowing, setIsFollowing] = useState(false);

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  useEffect(() => {
    setIsFollowing(user.follower_id.some((id) => id === loggedInUserId));
  }, [user]);

  return { isFollowing, setIsFollowing };
}
