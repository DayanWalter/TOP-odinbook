import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useUserCreate() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (formData) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/user/create`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const responseJSON = await response.json();
      console.log(responseJSON);
      navigate('/login');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
