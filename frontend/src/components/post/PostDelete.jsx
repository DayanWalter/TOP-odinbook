// DeleteUser.jsx
export default function DeletePost({ postId }) {
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
        `http://localhost:3000/api/post/${postId}/delete`,
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
      <h1>Delete Post:</h1>
      <button onClick={handleDeletePost}>Delete Post</button>
    </div>
  );
}
