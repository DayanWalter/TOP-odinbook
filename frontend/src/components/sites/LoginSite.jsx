import UserLogin from '../user/UserLogin';
import { Link } from 'react-router-dom';

export default function LoginSite() {
  return (
    <div>
      <div>
        <p>Welcome to</p>
        <p>
          BitFeather
          <img src="../../../bitfeather.png" alt="" />
        </p>
        <p>the chirping ground for bitcoin enthusiasts.</p>
      </div>
      <UserLogin />
      <Link to={'/signup'}>or Signup</Link>
    </div>
  );
}
