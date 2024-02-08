import styles from '../../css/Form.module.css';
export default function CommentDelete({ commentId }) {
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
        `http://localhost:3000/api/comment/${commentId}/delete`,
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
      <button onClick={handleDeleteComment} className={styles.deleteBtn}>
        Delete Comment
      </button>
    </div>
  );
}
