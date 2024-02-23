import CommentDelete from './CommentDelete';
import CommentUpdate from './CommentUpdate';

export default function CommentEdit({ commentId }) {
  return (
    <>
      <form>
        <CommentUpdate commentId={commentId} />

        <CommentDelete commentId={commentId} />
      </form>
    </>
  );
}
