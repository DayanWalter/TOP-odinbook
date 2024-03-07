// React
import { useEffect, useState } from "react";

export default function useUserIsLiking(post) {
  // Variables
  const authToken = localStorage.getItem("authToken");
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split(".")[1]));
  const loggedInUserId = payload._id;

  // Hooks
  const [isLiking, setIsLiking] = useState(false);

  // Effect
  useEffect(() => {
    setIsLiking(post.likes_id.some((id) => id === loggedInUserId));
  }, [post]);

  return { isLiking, setIsLiking };
}
