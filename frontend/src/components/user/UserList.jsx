import { Link } from "react-router-dom";
import UserCard from "./UserCard";

export default function UserList({ users }) {
  users.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));

  return (
    <ul className="grid gap-3 ">
      {users.length === 0 && "No one :("}
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/user/${user._id}`}>
            <UserCard user={user} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
