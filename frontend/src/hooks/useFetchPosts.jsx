// React
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function useFetchPosts() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");
  // id from params
  const loaderData = useLoaderData();
  const userId = loaderData.userid;

  // Hooks
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Log an error if authentication token is not available
        if (!authToken) {
          console.error("Authentication token not available.");
          setError("Authentication token not available.");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/post/user/${userId}`, {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        const responseJSON = await response.json();
        setData(responseJSON);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, loading, error };
}
