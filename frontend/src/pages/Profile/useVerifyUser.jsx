// React
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function useVerifyUser() {
  // Variables
  const loaderData = useLoaderData();
  const userIdFromParams = loaderData.userid;
  const authToken = localStorage.getItem("authToken");
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split(".")[1]));
  const loggedInUserId = payload._id;

  // Hooks
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  // Effect
  useEffect(() => {
    userIdFromParams === loggedInUserId
      ? setIsLoggedInUser(true)
      : setIsLoggedInUser(false);
  }, [userIdFromParams]);

  return { isLoggedInUser, userIdFromParams };
}
