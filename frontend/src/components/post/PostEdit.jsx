import PostDelete from './PostDelete';
import PostUpdate from './PostUpdate';

export default function PostEdit({ postId }) {
  return (
    <>
      <form>
        <PostUpdate postId={postId} />

        <PostDelete postId={postId} />
      </form>
    </>
  );
}
