import CommentDelete from './CommentDelete';
import CommentUpdate from './CommentUpdate';
import styles from '../../css/CommentEdit.module.css';

export default function CommentEdit({ commentId }) {
  return (
    <>
      <form className={styles.editCommentContainer}>
        <CommentUpdate commentId={commentId} />

        <CommentDelete commentId={commentId} />
      </form>
    </>
  );
}
