import { useState } from 'react';

export default function UnFollowUser({ userId, setIsFollowing }) {
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
        `http://localhost:3000/api/user/${userId}/unfollow`,
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
      <button onClick={handleUnFollowUser}>UnFollow User</button>
    </div>
  );
}
