import styles from './Site.module.css';

import UserProfile from '../user/UserProfile';

export default function ProfileSite() {
  return (
    <div className={styles.profileSite}>
      <UserProfile />
    </div>
  );
}
