import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthSite from '../sites/AuthSite';

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
    <AuthSite title={'Login'}>
      <form onSubmit={handleLoginUser}>
        <label htmlFor="user_name" className="w-full mb-5">
          Username:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="user_name"
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="user_password" className="w-full mb-5">
          Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="user_password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required={true}
          />
        </label>
        <button
          className="w-full px-4 py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
          type="submit"
          disabled={loading}
        >
          {loading ? `Loggin in ${userData.user_name}` : 'Login User'}
        </button>{' '}
        <button
          className="w-full px-4 py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
          onClick={handleLoginDemoUser}
          disabled={loading}
        >
          Demo User Login
        </button>
        <div className="w-2/5 py-1 mt-5 mb-5 text-center text-white rounded-sm hover:cursor-pointer bg-info hover:bg-info/80">
          <Link to={'/signup'}>or sign up</Link>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </AuthSite>
  );
}
