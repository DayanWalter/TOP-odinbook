import { useState } from 'react';

import useUpdatePost from '../../hooks/useUpdatePost';

export default function PostUpdate({ formData }) {
  // After successfull update, display message
  const [success, setSuccess] = useState(false);

  const {
    update,
    loading: updatePostLoading,
    error: updatePostError,
  } = useUpdatePost();

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    update(formData);
    setSuccess(true);
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
      {success && <div style={{ color: 'green' }}>Post updated!</div>}
    </>
  );
}
