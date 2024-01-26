import { useState } from 'react';

export default function LoginUser() {
  const [userData, setUserData] = useState({
    user_name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (userData.user_name.length < 6) {
      setError('Username must be at least 6 characters long.');
      return false;
    }

    if (userData.password.length < 6) {
      setError('Passwords must be at least 6 characters long.');
      return false;
    }

    setError('');
    return true;
  };

  const handleLoginUser = async () => {
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
    <div>
      <h1>Login:</h1>
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
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLoginUser} disabled={loading}>
        {loading ? `Login User: ${userData.user_name}` : 'Login User'}
      </button>
    </div>
  );
}
