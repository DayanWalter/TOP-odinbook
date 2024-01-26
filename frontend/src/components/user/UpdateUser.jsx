import { useState, useEffect } from 'react';

export default function UpdateUser() {
  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    password: '',
  });

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
          `http://localhost:3000/api/user/${userId}`,
          requestOptions
        );
        const data = await response.json();
        setUserData(data.searchedUser);
        console.log(userData);
      } catch (error) {
        console.error('Error while fetching user:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateUser = async () => {
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
        `http://localhost:3000/api/user/update`,
        requestOptions
      );
      const data = await response.json();
      console.log('User updated:', data);
    } catch (error) {
      console.error('Error while updating user:', error);
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
      <h1>Update User:</h1>
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
        Image Url:
        <input
          type="text"
          name="img_url"
          value={userData.img_url}
          onChange={handleChange}
        />
      </label>

      {/* Add password change later */}
      {/* <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label> */}

      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
}
