import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function useUserIsFollowing(data) {
  const [isFollowing, setIsFollowing] = useState(false);

  // // id from params
  // const loaderData = useLoaderData();
  // const userIdFromParams = loaderData.userid;

  // id from logged in user
  const authToken = localStorage.getItem("authToken");
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split(".")[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  useEffect(() => {
    if (data && data.follower_id) {
      setIsFollowing(data.follower_id.some((id) => id === loggedInUserId));
    }
  }, [data, loggedInUserId]);

  return { isFollowing, setIsFollowing };
}
