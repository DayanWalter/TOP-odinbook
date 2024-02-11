import styles from '../../css/Form.module.css';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id="loginUserComponent">
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="user_name" className={styles.inputGroup_label}>
            Username:
          </label>
          <input
            id="user_name"
            className={styles.inputGroup_input}
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            pattern="[a-zA-Z0-9]{6,}"
          />
          <span className={styles.inputGroup_error}>
            Username must be at least 6 characters long
          </span>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputGroup_label}>
            Password:
          </label>
          <input
            id="password"
            className={styles.inputGroup_input}
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            pattern="[a-zA-Z0-9]{6,}"
          />
          <span className={styles.inputGroup_error}>
            Password must be at least 6 characters long
          </span>
        </div>
        <button
          className={styles.formBtn}
          onClick={handleLoginUser}
          disabled={loading}
        >
          {loading ? `Login User: ${userData.user_name}` : 'Login User'}
        </button>{' '}
        <button
          className={styles.formBtn}
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
