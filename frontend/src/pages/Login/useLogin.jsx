// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // Hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Functions
  const login = async (formData) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseJSON = await response.json();

      if (responseJSON.token) {
        setError(null);
        setLoading(false);

        localStorage.setItem("authToken", responseJSON.token);
        // After successfull login, navigate to home
        navigate("/home");
        return;
        // if the response is an array, set the error to this array
      } else if (responseJSON.length) {
        setError(responseJSON);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
