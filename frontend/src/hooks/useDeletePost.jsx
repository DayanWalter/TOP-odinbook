// React
import { useState } from "react";

export default function useDeletePost() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Functions
  const deletePost = async (formData) => {
    try {
      setLoading(true);

      // Log an error if authentication token is not available
      if (!authToken) {
        console.error("Authentication token not available.");
        setError("Authentication token not available.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/post/${formData._id}/delete`,
        {
          method: `DELETE`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseJSON = await response.json();
      if (responseJSON.deletedPost) {
        setError(null);
        setLoading(false);

        return;
        // if the response is an array, set the error to this array
      } else if (responseJSON.length) {
        setError(responseJSON);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
}
