import Icon from '@mdi/react';

import { mdiAlertOutline } from '@mdi/js';
import useDeletePost from '../../hooks/useDeletePost';

export default function PostDelete({ formData }) {
  const {
    deletePost,
    loading: deletePostLoading,
    error: deletePostError,
  } = useDeletePost();

  const handleDeletePost = async () => {
    deletePost(formData);
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
