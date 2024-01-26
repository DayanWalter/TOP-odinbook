import CreateUser from '../user/CreateUser';
import LoginUser from '../user/LoginUser';
import ReadUsers from '../user/ReadUsers';
import DeleteUser from '../user/DeleteUser';
import UpdateUser from '../user/UpdateUser';
import { Link } from 'react-router-dom';

export default function IndexSite() {
  return (
    <div>
      <ul>
        <li>
          <Link to={`user/create`}>CreateUser</Link>
        </li>
        <li>
          <Link to={`user/login`}>LoginUser</Link>
        </li>
        <li>
          <Link to={`users`}>ReadUsers</Link>
        </li>
        <li>
          <Link to={`user/delete`}>DeleteUser</Link>
        </li>
        <li>
          <Link to={`user/update`}>UpdateUser</Link>
        </li>
      </ul>
      {/* <UpdateUser /> */}
    </div>
  );
}
