import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import styles from '../../css/UserEdit.module.css';

export default function EditUser() {
  return (
    <form className={styles.editUserContainer}>
      <UpdateUser />
      <DeleteUser />
    </form>
  );
}
