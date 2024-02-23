export default function DeletePost({ postId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const handleDeletePost = async () => {
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
        `${BASE_URL}/api/post/${postId}/delete`,
        requestOptions
      );

      if (response.status === 200) {
        console.log('Post deleted.');
      } else {
        console.error('Error deleting post:', response.status);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div id="deletePost">
      <button onClick={handleDeletePost}>Delete Post</button>
    </div>
  );
}
