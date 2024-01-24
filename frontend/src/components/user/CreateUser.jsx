// CreateUser.jsx
import { useState } from 'react';

const CreateUser = () => {
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const isValidUsername = (username) => username.length >= 6;
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password, repeatPassword) => {
    return password === repeatPassword;
  };
  const isValidPasswordLength = (password, repeatPassword) => {
    return password.length >= 6 && repeatPassword.length >= 6;
  };

  const handleCreateUser = async () => {
    // Validate username and email
    if (!isValidUsername(user_name)) {
      setError([{ msg: 'Username must be at least 6 characters long.' }]);
      return;
    }

    if (!isValidEmail(email)) {
      setError([{ msg: 'Invalid email format.' }]);
      return;
    }
    if (!isValidPassword(password, repeatPassword)) {
      setError([{ msg: 'Passwords arent the same' }]);
      return;
    }
    if (!isValidPasswordLength(password, repeatPassword)) {
      setError([{ msg: 'Passwords must be at least 6 characters long' }]);
      return;
    }
    setError('');
    // Parameters for the backend request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name, email, password }),
    };

    try {
      // Set loading state to true, indicating the start of the API request
      setLoading(true);

      // Make the POST request to create a new user
      const response = await fetch(
        'http://localhost:3000/api/user/create',
        requestOptions
      );
      // Parse the JSON data from the successful response
      const data = await response.json();

      // Throw an error if the response indicates a failure
      if (!response.ok) {
        setError(data.error.errors);
        return;
      }
      console.log('New user created:', data);
      // Reset the user_name/email/password state after successful user creation
      setUsername('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      // Set the error state to display a generic error message
      console.log(error);
      setError('Error during user creation. Please try again.');
      console.error('Error during user creation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New User:</h1>
      <label>Username:</label>
      <input
        type="text"
        value={user_name}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Repeat Password:</label>
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {error &&
        error.map((err, index) => (
          <div key={index} style={{ color: 'red' }}>
            {err.msg}
          </div>
        ))}
      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? `Creating User: ${user_name}` : 'Create User'}
      </button>
    </div>
  );
};

export default CreateUser;
