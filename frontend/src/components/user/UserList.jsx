import { Link } from 'react-router-dom';
import UserListCard from './UserListCard';

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {console.log(user)}
          <Link to={`/user/${user._id}`}>
            <UserListCard
              user_name={user.user_name}
              reg_date={user.reg_date}
            ></UserListCard>
          </Link>
        </li>
      ))}
    </ul>
  );
}
