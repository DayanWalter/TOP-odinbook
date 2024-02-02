import styles from './UserListCard.module.css';

export default function UserListCard({ user_name, reg_date }) {
  return (
    <div className={styles.card}>
      <div className={styles.profilePicture}>ProfilePicture</div>
      <div>{user_name}</div>
      <div>Location</div>
      <div>{new Date(reg_date).toLocaleDateString()}</div>
    </div>
  );
}
