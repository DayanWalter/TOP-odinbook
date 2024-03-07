// React
import { useState } from "react";

export default function useUpdateComment() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Functions
  const update = async (formData) => {
    try {
      setLoading(true);

      // Log an error if authentication token is not available
      if (!authToken) {
        console.error("Authentication token not available.");
        setError("Authentication token not available.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/comment/${formData._id}/update`,
        {
          method: `PUT`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseJSON = await response.json();
      if (responseJSON.user) {
        setError(null);
        setLoading(false);
        localStorage.setItem("authToken", responseJSON.token);

        console.log("Comment udated");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
