// React
import { useEffect, useState } from "react";

export default function useUserIsFollowing(data) {
  // Variables
  const authToken = localStorage.getItem("authToken");
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split(".")[1]));
  const loggedInUserId = payload._id;

  // Hooks
  const [isFollowing, setIsFollowing] = useState(false);

  // Effect
  useEffect(() => {
    if (data && data.follower_id) {
      setIsFollowing(
        data.follower_id.some((obj) => obj._id === loggedInUserId)
      );
    }
  }, [data, loggedInUserId]);

  return { isFollowing, setIsFollowing };
}
