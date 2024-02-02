import styles from './UserListCard.module.css';

export default function UserListCard({
  user_name,
  location,
  avatar_url,
  reg_date,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.profilePicture}>
        <img className={styles.roundedImage} src={avatar_url} alt="Avatar" />
      </div>
      <div>{user_name}</div>
      <div>{location}</div>
      <div>{new Date(reg_date).toLocaleDateString()}</div>
    </div>
  );
}
