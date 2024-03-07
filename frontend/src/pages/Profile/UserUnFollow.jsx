export default function UserUnFollow({ userId, setIsFollowing }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const handleUnFollowUser = async () => {
    const authToken = localStorage.getItem('authToken');

    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      // Execute the backend request
      const response = await fetch(
        `${BASE_URL}/api/user/${userId}/unfollow`,
        requestOptions
      );

      if (response.ok) {
        // Update the state to indicate that the user is now being followed
        console.log('User unfollowed successfully.');
      } else {
        console.error('Error following user:', response.status);
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsFollowing(false);
    }
  };

  return (
    <div>
      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUnFollowUser}
      >
        UnFollow User
      </button>
    </div>
  );
}
