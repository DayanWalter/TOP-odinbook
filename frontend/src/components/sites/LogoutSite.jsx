import UserLogout from '../user/UserLogout';
import styles from './Site.module.css';

export default function LogoutSite() {
  return (
    <div className={styles.loginSite}>
      <UserLogout />
    </div>
  );
}
