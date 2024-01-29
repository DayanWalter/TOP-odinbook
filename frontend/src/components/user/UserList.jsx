import { Link } from 'react-router-dom';

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`}>{user.user_name}</Link>
        </li>
      ))}
    </ul>
  );
}
