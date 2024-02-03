import { Link } from 'react-router-dom';
import styles from './UserList.module.css';
import UserListCard from './UserListCard';

export default function UserList({ users }) {
  return (
    <ul className={styles.listContainer}>
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`}>
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
