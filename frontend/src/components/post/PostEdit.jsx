import PostDelete from './PostDelete';
import PostUpdate from './PostUpdate';
import styles from '../../css/PostEdit.module.css';

export default function PostEdit({ postId }) {
  return (
    <>
      <form className={styles.editPostContainer}>
        <PostUpdate postId={postId} />

        <PostDelete postId={postId} />
      </form>
    </>
  );
}
