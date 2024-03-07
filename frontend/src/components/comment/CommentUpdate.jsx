// React
import { useState } from "react";

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
  const [success, setSuccess] = useState(false);

  // Functions
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    update(formData);
    setSuccess(true);
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
      {success && <div style={{ color: "green" }}>Comment updated!</div>}
    </>
  );
}
