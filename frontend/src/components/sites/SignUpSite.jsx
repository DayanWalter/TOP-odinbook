import styles from './Site.module.css';

import CreateUser from '../user/CreateUser';
import { Link } from 'react-router-dom';

export default function SignUpSite() {
  return (
    <div className={styles.signupSite}>
      <CreateUser />
      <Link to={'/login'}>or Login</Link>
    </div>
  );
}
