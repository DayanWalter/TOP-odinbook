import styles from './Form.module.css';
import { useState } from 'react';

export default function LoginUser() {
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
        'http://localhost:3000/api/user/login',
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      // Save the token, e.g., in local storage
      localStorage.setItem('authToken', data.token);

      console.log('Successfully logged in:', data);
      setUserData({
        user_name: '',
        password: '',
      });
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
      <form className={styles.mainForm}>
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
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
