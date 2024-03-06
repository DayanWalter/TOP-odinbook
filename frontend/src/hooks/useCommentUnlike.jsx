export default function useCommentUnlike() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const commentUnlike = async (commentId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(
        `${BASE_URL}/api/comment/${commentId}/unlike`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        console.log('Comment successfully unliked.');
      } else {
        console.error('Error unliking comment:', response.status);
      }
    } catch (error) {
      console.error('Error unliking comment:', error);
    }
  };

  return { commentUnlike };
}
