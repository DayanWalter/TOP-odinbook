import styles from './Site.module.css';
import UserLogin from '../user/UserLogin';
import { Link } from 'react-router-dom';

export default function LoginSite() {
  return (
    <div className={styles.loginSite}>
      <UserLogin />
      <Link to={'/signup'}>or Signup</Link>
    </div>
  );
}
