import styles from './Site.module.css';
import UserLogin from '../user/UserLogin';
import { Link } from 'react-router-dom';

export default function LoginSite() {
  return (
    <div className={styles.loginSite}>
      <div className={styles.header}>
        <p className={styles.top}>Welcome to</p>
        <p className={styles.main}>
          BitFeather
          <img src="../../../bitfeather.png" alt="" />
        </p>
        <p className={styles.bottom}>
          the chirping ground for bitcoin enthusiasts.
        </p>
      </div>
      <UserLogin />
      <Link to={'/signup'}>or Signup</Link>
    </div>
  );
}
