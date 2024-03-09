// React
import { useNavigate } from "react-router-dom";

// Hooks
import useUpdatePost from "../../hooks/useUpdatePost";

export default function PostUpdate({ formData }) {
  // Custom hooks
  const {
    update,
    loading: updatePostLoading,
    error: updatePostError,
  } = useUpdatePost();

  // Hooks
  const navigate = useNavigate();

  // Functions
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    await update(formData);
    navigate(0);
  };

  return (
    <>
      {updatePostError && <div>{updatePostError}</div>}
      {updatePostLoading && <div>Update Post...</div>}

      <button
        className="p-2 mb-5 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUpdatePost}
      >
        Update Post
      </button>
    </>
  );
}
