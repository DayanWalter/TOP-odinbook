// Icons
import Icon from "@mdi/react";
import { mdiAlertOutline } from "@mdi/js";

// Hooks
import useDeletePost from "../../hooks/useDeletePost";
import { useNavigate } from "react-router-dom";

export default function PostDelete({ formData }) {
  // Custom hooks
  const {
    deletePost,
    loading: deletePostLoading,
    error: deletePostError,
  } = useDeletePost();

  // Hooks
  const navigate = useNavigate();

  // TODO:
  // Functions
  const handleDeletePost = async (e) => {
    e.preventDefault();
    await deletePost(formData);
    navigate(0);
  };

  return (
    <>
      {deletePostError && <div>{deletePostError}</div>}
      {deletePostLoading && <div>Delete Post...</div>}

      <button
        className="flex justify-between px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
        onClick={handleDeletePost}
      >
        <Icon path={mdiAlertOutline} size={0.9} />
        Delete Post
        <Icon path={mdiAlertOutline} size={0.9} />
      </button>
    </>
  );
}
