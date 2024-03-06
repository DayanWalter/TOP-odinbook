export default function usePostUnlike() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const postUnlike = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${BASE_URL}/api/post/${postId}/unlike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log('Post successfully unliked.');
      } else {
        console.error('Error unliking post:', response.status);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  return { postUnlike };
}
