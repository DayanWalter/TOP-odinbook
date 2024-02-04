import styles from './Site.module.css';

import UserCreate from '../user/UserCreate';
import { Link } from 'react-router-dom';

export default function SignUpSite() {
  return (
    <div className={styles.signupSite}>
      <UserCreate />
      <Link to={'/login'}>or Login</Link>
    </div>
  );
}
