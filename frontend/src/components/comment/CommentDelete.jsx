export default function CommentDelete({ commentId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const handleDeleteComment = async () => {
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
        `${BASE_URL}/api/comment/${commentId}/delete`,
        requestOptions
      );

      if (response.status === 200) {
        console.log('Comment deleted.');
      } else {
        console.error('Error deleting comment:', response.status);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div id="deleteComment">
      <button onClick={handleDeleteComment}>Delete Comment</button>
    </div>
  );
}
