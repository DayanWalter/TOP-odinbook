import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';

export default function EditPost({ postId }) {
  return (
    <>
      <UpdatePost postId={postId} />
      <DeletePost postId={postId} />
    </>
  );
}
