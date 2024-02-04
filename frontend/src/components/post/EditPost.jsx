import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';
import styles from '../../css/EditUser.module.css';

export default function EditPost({ postId }) {
  return (
    <>
      <form className={styles.editUserContainer}>
        <UpdatePost postId={postId} />

        <DeletePost postId={postId} />
      </form>
    </>
  );
}
