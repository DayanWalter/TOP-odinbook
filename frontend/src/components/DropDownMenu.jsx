import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import { mdiAccountCogOutline } from '@mdi/js';
import { mdiLogout } from '@mdi/js';

export default function DropDownMenu({ user, setShowEditProfile }) {
  const handleSetShowEditProfile = () => {
    setShowEditProfile((prev) => !prev);
  };
  return (
    <ul className="absolute p-5 bg-white border rounded right-5 top-16">
      <Link to={`/user/${user._id}`}>
        <li className="flex gap-2 mb-2 hover:text-primary/80">
          <Icon path={mdiAccountOutline} size={1} />

          <p>View Profile</p>
        </li>
      </Link>

      <li
        className="flex gap-2 mb-2 hover:cursor-pointer hover:text-primary/80"
        onClick={handleSetShowEditProfile}
      >
        <Icon path={mdiAccountCogOutline} size={1} />

        <p>Edit Profile</p>
      </li>
      <Link to={'/logout'}>
        <li className="flex gap-2 pt-4 border-t hover:text-primary/80">
          <Icon path={mdiLogout} size={1} /> <p>Logout</p>
        </li>
      </Link>
    </ul>
  );
}
