import { useState, useEffect } from "react";

// Components
import UserUpdate from "./UserUpdate";
import UserDelete from "./UserDelete";

// Hooks
import useFetchLoggedInUser from "./useFetchLoggedInUser";

export default function UserEdit() {
  const [formData, setFormData] = useState({});

  const {
    data: userData,
    loading: fetchUserLoading,
    error: fetchUserError,
  } = useFetchLoggedInUser();

  // Fetch user data, then setFormData
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

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
      {fetchUserLoading && <div></div>}
      {formData && (
        <form className="flex flex-col max-w-md px-5 py-6 mt-16 bg-white rounded shadow-md sm:mt-0 sm:py-12 sm:px-10">
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
          <UserUpdate formData={formData} />
          <UserDelete />

          {fetchUserError && (
            <div style={{ color: "red" }}>{fetchUserError}</div>
          )}
        </form>
      )}
    </>
  );
}
