// DeleteUser.jsx
export default function DeleteUser({ userId }) {
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
        'http://localhost:3000/api/user/delete',
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
    <div id="deleteUser">
      <h1>Delete User:</h1>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}
