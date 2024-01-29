export default function UnLikeComment({ commentId, setIsLiking }) {
  const handleUnLikeComment = async () => {
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
        `http://localhost:3000/api/comment/${commentId}/unlike`,
        requestOptions
      );

      if (response.ok) {
        // Update the state to indicate that the comment is now unliked
        console.log('Comment successfully unliked.');
      } else {
        console.error('Error unliking comment:', response.status);
      }
    } catch (error) {
      console.error('Error unliking comment:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div>
      <button onClick={handleUnLikeComment}>UnLike Comment</button>
    </div>
  );
}
