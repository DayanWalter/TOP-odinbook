import { Link } from 'react-router-dom';
import UserEdit from './user/UserEdit';

export default function DropDownMenu({ user, setShowEditProfile }) {
  const handleSetShowEditProfile = () => {
    setShowEditProfile((prev) => !prev);
  };

  return (
    <ul className="absolute p-5 bg-white border rounded right-5 top-16">
      <Link to={`/user/${user._id}`}>
        <li>View Profile</li>
      </Link>

      <li className="hover:cursor-pointer" onClick={handleSetShowEditProfile}>
        Edit Profile
      </li>

      <li className="border-t">Logout</li>
    </ul>
  );
}
