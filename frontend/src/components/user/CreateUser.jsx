import styles from './Form.module.css';

import { useState } from 'react';

export default function CreateUser() {
  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (passwordsMatchError) {
      return;
    }
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
        'http://localhost:3000/api/user/create',
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }

      console.log('New user created:', data);
      setUserData({
        user_name: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
    } catch (error) {
      console.error('Error during user creation:', error);
      setError('Error during user creation. Please try again.');
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
    // Check if passwords are equal
    if (name === 'repeatPassword') {
      setPasswordsMatchError(value !== userData.password);
    }
  };

  return (
    <div id="createUserComponent">
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
          <label htmlFor="email" className={styles.inputGroup_label}>
            Email:
          </label>
          <input
            id="email"
            className={styles.inputGroup_input}
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            autoComplete="true"
          />
          <span className={styles.inputGroup_error}>
            Email has the wrong format
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
        <div className={styles.inputGroup}>
          <label htmlFor="repeatPassword" className={styles.inputGroup_label}>
            Repeat Password:
          </label>
          <input
            id="repeatPassword"
            className={`${styles.inputGroup_input} ${
              passwordsMatchError ? `${styles.invalid}` : ''
            }`}
            type="password"
            name="repeatPassword"
            value={userData.repeatPassword}
            onChange={handleChange}
          />
          <span className={styles.inputGroup_error}>
            Passwords do not match
          </span>
        </div>
        <button
          className={styles.formBtn}
          onClick={handleCreateUser}
          disabled={loading}
        >
          {loading ? `Creating User: ${userData.user_name}` : 'Signup'}
        </button>
        {error && <div style={{ color: 'red', fontSize: '1rem' }}>{error}</div>}
      </form>
    </div>
  );
}
