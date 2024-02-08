import styles from '../../css/PostLikeUnlike.module.css';

import Icon from '@mdi/react';

import { mdiHeart } from '@mdi/js';

export default function PostUnLike({ postId, setIsLiking }) {
  const handleUnLikePost = async () => {
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
        `http://localhost:3000/api/post/${postId}/unlike`,
        requestOptions
      );

      if (response.ok) {
        // Update the state to indicate that the user is now being followed
        console.log('Post successfully unliked.');
      } else {
        console.error('Error unliking post:', response.status);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div>
      <Icon
        onClick={handleUnLikePost}
        path={mdiHeart}
        size={1}
        className={styles.icon}
      />
    </div>
  );
}
