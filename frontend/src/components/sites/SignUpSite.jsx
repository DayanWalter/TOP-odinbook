import UserCreate from '../user/UserCreate';
import { Link } from 'react-router-dom';

export default function SignUpSite() {
  return (
    <div>
      <UserCreate />
      <Link to={'/login'}>or Login</Link>
    </div>
  );
}
