import { Link } from 'react-router-dom';
import UserListCard from './UserListCard';

export default function UserList({ users }) {
  users.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));

  return (
    <ul className="grid gap-3 md:grid-cols-2 ">
      {users.length === 0 && 'No one :('}
      {users.map((user) => (
        <li key={user._id} className="">
          <Link to={`/user/${user._id}`}>
            <UserListCard
              user_name={user.user_name}
              avatar_url={user.avatar_url}
              posts_id={user.posts_id}
              reg_date={user.reg_date}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
