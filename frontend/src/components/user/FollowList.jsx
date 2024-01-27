import { Link } from 'react-router-dom';

export default function FollowList({ follows }) {
  return (
    <ul>
      {follows.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`}>{user.user_name}</Link>
        </li>
      ))}
    </ul>
  );
}
