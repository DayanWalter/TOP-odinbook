import CreateUser from '../user/CreateUser';
import LoginUser from '../user/LoginUser';
import ReadUsers from '../user/ReadUsers';
import DeleteUser from '../user/DeleteUser';
import UpdateUser from '../user/UpdateUser';

export default function LoginSite() {
  return (
    <div>
      <CreateUser />
      <LoginUser />
      <ReadUsers />
      <DeleteUser />
      <UpdateUser />
    </div>
  );
}
