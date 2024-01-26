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

  const validateForm = () => {
    if (userData.user_name.length < 6) {
      setError('Username must be at least 6 characters long.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('Invalid email format.');
      return false;
    }

    if (userData.password !== userData.repeatPassword) {
      setError('Passwords are not the same.');
      return false;
    }

    if (userData.password.length < 6 || userData.repeatPassword.length < 6) {
      setError('Passwords must be at least 6 characters long.');
      return false;
    }

    setError('');
    return true;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
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
  };

  return (
    <div id="createUser">
      <h1>Create a New User:</h1>
      <label>
        Username:
        <input
          type="text"
          name="user_name"
          value={userData.user_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Repeat Password:
        <input
          type="password"
          name="repeatPassword"
          value={userData.repeatPassword}
          onChange={handleChange}
        />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? `Creating User: ${userData.user_name}` : 'Create User'}
      </button>
    </div>
  );
}
