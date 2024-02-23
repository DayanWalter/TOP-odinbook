import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // User Login
  const handleLoginUser = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/user/login`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      // Save the token, e.g., in local storage
      localStorage.setItem('authToken', data.token);
      const authToken = localStorage.getItem('authToken');
      // Split the payload of the jwt and convert the ._id part
      const payload = JSON.parse(atob(authToken.split('.')[1]));
      // Define the username you are looking for
      const userId = payload._id;

      console.log('Successfully logged in:', data);
      setUserData({
        user_name: '',
        password: '',
      });
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error('Error during user login:', error);
      setError('Error during user login. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // Demo User Login
  const handleLoginDemoUser = async (e) => {
    e.preventDefault();
    setUserData({
      user_name: 'DemoUser',
      password: '111111',
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: 'DemoUser',
        password: '111111',
      }),
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/user/login`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      // Save the token, e.g., in local storage
      localStorage.setItem('authToken', data.token);
      // Split the payload of the jwt and convert the ._id part
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      // Define the username you are looking for
      const userId = payload._id;

      console.log('Successfully logged in:', data);
      setUserData({
        user_name: '',
        password: '',
      });
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error('Error during user login:', error);
      setError('Error during user login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Change userData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="border">
      <form className="flex flex-col items-start justify-start w-full mt-6">
        <label htmlFor="user_name" className="w-full max-w-sm mb-5">
          Username:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-blue-400/20 focus:border-blue-400 dark:text-black"
            id="user_name"
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            pattern="[a-zA-Z0-9]{6,}"
          />
          <span>Username must be at least 6 characters long</span>
        </label>
        <label htmlFor="user_password" className="w-full max-w-sm mb-5">
          Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-blue-400/20 focus:border-blue-400 dark:text-black"
            id="user_password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            pattern="[a-zA-Z0-9]{6,}"
          />
          <span>Password must be at least 6 characters long</span>
        </label>
        <button
          className="px-4 py-2 mb-5 font-medium text-white rounded-lg bg-primary hover:bg-primary/80"
          onClick={handleLoginUser}
          disabled={loading}
        >
          {loading ? `Login User: ${userData.user_name}` : 'Login User'}
        </button>{' '}
        <button
          className="px-4 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary/80"
          onClick={handleLoginDemoUser}
          disabled={loading}
        >
          Demo User Login
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
