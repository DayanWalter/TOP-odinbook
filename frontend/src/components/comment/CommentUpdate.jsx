// React
import { useNavigate } from "react-router-dom";

// Hooks
import useUpdateComment from "../../hooks/useUpdateComment";

export default function CommentUpdate({ formData }) {
  // Custom hooks
  const {
    update,
    loading: updateCommentLoading,
    error: updateCommentError,
  } = useUpdateComment();

  // Hooks
  const navigate = useNavigate();

  // Functions
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    await update(formData);
    navigate(0);
  };

  return (
    <>
      {updateCommentError && <div>{updateCommentError}</div>}
      {updateCommentLoading && <div>Update Comment...</div>}

      <button
        className="p-2 mb-5 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUpdateComment}
      >
        Update Comment
      </button>
    </>
  );
}
