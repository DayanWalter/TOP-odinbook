import { useState, useEffect } from 'react';
import Icon from '@mdi/react';

import { mdiAlertOutline } from '@mdi/js';

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
  const handleDeleteUser = async () => {
    const authToken = localStorage.getItem('authToken');

    // Parameters for the backend request
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/user/delete`,
        requestOptions
      );

      if (response.status === 200) {
        console.log('User deleted.');
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <form className="flex flex-col max-w-md px-5 py-6 mt-16 bg-white rounded shadow-md sm:mt-0 sm:py-12 sm:px-10 ">
      {/* User Name */}
      <label className="" htmlFor="user_name">
        Username:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="user_name"
          type="text"
          name="user_name"
          value={userData.user_name}
          onChange={handleChange}
          pattern="[a-zA-Z0-9]{6,}"
          autoComplete="off"
        />
      </label>
      {/* Email */}
      <label htmlFor="email">
        Email:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          autoComplete="true"
        />
      </label>
      {/* Header Image */}
      <label htmlFor="img_url">
        Header url:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="img_url"
          type="text"
          name="img_url"
          value={userData.img_url}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      {/* Avatar */}
      <label htmlFor="avatar_url">
        Profile picture url:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="avatar_url"
          type="text"
          name="avatar_url"
          value={userData.avatar_url}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      {/* Bio */}
      <label htmlFor="bio">
        Bio:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="bio"
          type="text"
          name="bio"
          value={userData.bio}
          onChange={handleChange}
          pattern="^(?:.{0,60})$"
          autoComplete="off"
        />
      </label>
      {/* Location */}
      <label htmlFor="location">
        Location:
        <input
          className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="location"
          type="text"
          name="location"
          value={userData.location}
          onChange={handleChange}
          // TODO: Add special chars to regex
          pattern="[a-zA-Z0-9]{3,}"
          autoComplete="off"
        />
      </label>

      <button
        className="p-2 mb-5 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUpdateUser}
      >
        Update User
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>User updated!</div>}

      <button
        className="flex justify-between px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
        onClick={handleDeleteUser}
      >
        <Icon path={mdiAlertOutline} size={0.9} />
        <p>Delete User</p>
        <Icon path={mdiAlertOutline} size={0.9} />
      </button>
    </form>
  );
}
