import { Link } from 'react-router-dom';
import ListItemCard from '../ListItemCard';

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`}>
            <ListItemCard user_name="user_name"></ListItemCard>
            {user.user_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
