export default function usePostLike() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const postLike = async (postId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${BASE_URL}/api/post/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log('Post successfully liked.');
      } else {
        console.error('Error unliking post:', response.status);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return { postLike };
}
