import styles from './Site.module.css';
import LoginUser from '../user/LoginUser';
import { Link } from 'react-router-dom';

export default function LoginSite() {
  return (
    <div className={styles.loginSite}>
      <LoginUser />
      <Link to={'/signup'}>or Signup</Link>
    </div>
  );
}
