// Icons
import Icon from "@mdi/react";
import { mdiAlertOutline } from "@mdi/js";

// Hooks
import useDeleteComment from "../../hooks/useDeleteComment";
import { useNavigate } from "react-router-dom";

export default function CommentDelete({ formData }) {
  // Custom hooks
  const {
    deleteComment,
    loading: deleteCommentLoading,
    error: deleteCommentError,
  } = useDeleteComment();

  // Hooks
  const navigate = useNavigate();

  // Functions
  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await deleteComment(formData);
    navigate(0);
  };

  return (
    <>
      {deleteCommentError && <div>{deleteCommentError}</div>}
      {deleteCommentLoading && <div>Delete comment...</div>}

      <button
        className="flex justify-between px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
        onClick={handleDeleteComment}
      >
        <Icon path={mdiAlertOutline} size={0.9} />
        Delete comment
        <Icon path={mdiAlertOutline} size={0.9} />
      </button>
    </>
  );
}
