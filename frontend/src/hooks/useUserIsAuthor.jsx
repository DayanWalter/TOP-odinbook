// React
import { useEffect, useState } from "react";

export default function useUserIsAuthor(post) {
  // Variables
  const authToken = localStorage.getItem("authToken");
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split(".")[1]));
  const loggedInUserId = payload._id;

  // Hooks
  const [isAuthor, setIsAuthor] = useState(false);

  // Effect
  useEffect(() => {
    setIsAuthor(post.author_id._id === loggedInUserId);
  }, [post]);

  return { isAuthor };
}
