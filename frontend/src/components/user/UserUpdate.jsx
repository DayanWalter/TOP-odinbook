import { useState, useEffect } from 'react';

export default function UserUpdate() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    img_url: '',
    avatar_url: '',
    location: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const userId = payload._id;

  useEffect(() => {
    const fetchData = async () => {
      // Parameters for the backend request
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/${userId}`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error.errors[0].msg);
          return;
        }
        setUserData(data.searchedUser);
        setError('');
      } catch (error) {
        console.error('Error while fetching user:', error);
        setError(error);
      }
    };

    fetchData();
  }, [userId, authToken]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setSuccess(false);
    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/user/update`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }
      // Save the token, e.g., in local storage
      localStorage.setItem('authToken', data.token);

      console.log('User updated:', data);
      setError('');
    } catch (error) {
      console.error('Error while updating user:', error);
      setError(error);
    }
    setSuccess(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      {/* User Name */}
      <div>
        <label htmlFor="user_name">Username:</label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          value={userData.user_name}
          onChange={handleChange}
          pattern="[a-zA-Z0-9]{6,}"
          autoComplete="off"
        />
        <span>Username must be at least 6 characters long</span>
      </div>
      {/* Email */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          autoComplete="true"
        />
        <span>Email has the wrong format</span>
      </div>
      {/* Header Image */}
      <div>
        <label htmlFor="img_url">Header url:</label>
        <input
          id="img_url"
          type="text"
          name="img_url"
          value={userData.img_url}
          onChange={handleChange}
          autoComplete="off"
        />
        <span>img_url has the wrong format</span>
      </div>
      {/* Avatar */}
      <div>
        <label htmlFor="avatar_url">Profile picture url:</label>
        <input
          id="avatar_url"
          type="text"
          name="avatar_url"
          value={userData.avatar_url}
          onChange={handleChange}
          autoComplete="off"
        />
        <span>Profile picture url has the wrong format</span>
      </div>
      {/* Bio */}
      <div>
        <label htmlFor="user_name">Bio:</label>
        <input
          id="bio"
          type="text"
          name="bio"
          value={userData.bio}
          onChange={handleChange}
          pattern="^(?:.{0,60})$"
          autoComplete="off"
        />
        <span>Bio must be shorter than 60 chars</span>
      </div>
      {/* Location */}
      <div>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          name="location"
          value={userData.location}
          onChange={handleChange}
          // TODO: Add special chars to regex
          pattern="[a-zA-Z0-9]{3,}"
          autoComplete="off"
        />
        <span>Location must be at least 3 characters long</span>
      </div>

      <button onClick={handleUpdateUser}>Update User</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>User updated!</div>}
    </>
  );
}
