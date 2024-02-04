import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';
import styles from '../../css/UserEdit.module.css';

export default function UserEdit() {
  return (
    <form className={styles.editUserContainer}>
      <UserUpdate />
      <UserDelete />
    </form>
  );
}
