import { Link } from 'react-router-dom';
import styles from '../../css/UserList.module.css';
import UserListCard from './UserListCard';

export default function UserList({ users }) {
  users.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));

  const handleScrollUp = () => {
    document
      .getElementById('profileUserContainer')
      .scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ul className={styles.listContainer}>
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`} onClick={handleScrollUp}>
            <UserListCard
              user_name={user.user_name}
              avatar_url={user.avatar_url}
              posts_id={user.posts_id}
              reg_date={user.reg_date}
            ></UserListCard>
          </Link>
        </li>
      ))}
    </ul>
  );
}
