import { useState, useEffect } from 'react';
import Icon from '@mdi/react';

import { mdiAlertOutline } from '@mdi/js';
import useFetchUser from '../../hooks/useFetchUser';
import useUpdateUser from '../../hooks/useUpdateUser';
import useDeleteUser from '../../hooks/useDeleteUser';
import { useNavigate } from 'react-router-dom';

export default function UserUpdate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  // After successfull update, display message
  const [success, setSuccess] = useState(false);

  const {
    data: userData,
    loading: fetchUserLoading,
    error: fetchUserError,
  } = useFetchUser();

  const {
    update,
    loading: updateUserLoading,
    error: updateUserError,
  } = useUpdateUser();

  const {
    deleteUser,
    loading: deleteUserLoading,
    error: deleteUserError,
  } = useDeleteUser();

  // Fetch user data, then setFormData
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    update(formData);
    setSuccess(true);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    deleteUser();
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {fetchUserError && <div>{fetchUserError}</div>}
      {deleteUserError && <div>{deleteUserError}</div>}
      {updateUserError && <div>{updateUserError}</div>}
      {fetchUserLoading && <div>Fetching Data...</div>}
      {updateUserLoading && <div>Update User...</div>}
      {deleteUserLoading && <div>Delete User...</div>}
      {formData && (
        <form className="flex flex-col max-w-md px-5 py-6 mt-16 bg-white rounded shadow-md sm:mt-0 sm:py-12 sm:px-10 ">
          {/* User Name */}
          <label className="" htmlFor="user_name">
            Username:
            <input
              className="w-full px-2 py-1 mb-5 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
              id="user_name"
              type="text"
              name="user_name"
              defaultValue={formData.user_name}
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
              defaultValue={formData.email}
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
              defaultValue={formData.img_url}
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
              defaultValue={formData.avatar_url}
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
              defaultValue={formData.bio}
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
              defaultValue={formData.location}
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
          {fetchUserError && (
            <div style={{ color: 'red' }}>{fetchUserError}</div>
          )}
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
      )}
    </>
  );
}
