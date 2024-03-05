import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function useVerifyUser() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  // id from params
  const loaderData = useLoaderData();
  const userIdFromParams = loaderData.userid;

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  useEffect(() => {
    userIdFromParams === loggedInUserId
      ? setIsLoggedInUser(true)
      : setIsLoggedInUser(false);
  }, [userIdFromParams]);

  return { isLoggedInUser, userIdFromParams };
}
