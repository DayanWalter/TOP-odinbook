import { useEffect, useState } from 'react';

export default function useUserIsLiking(post) {
  const [isLiking, setIsLiking] = useState(false);

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  useEffect(() => {
    setIsLiking(post.likes_id.some((id) => id === loggedInUserId));
  }, [post]);

  return { isLiking, setIsLiking };
}
