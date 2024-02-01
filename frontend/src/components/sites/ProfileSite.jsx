import styles from './Site.module.css';

import ProfileUser from '../user/ProfileUser';

export default function ProfileSite() {
  return (
    <div className={styles.profileSite}>
      <ProfileUser />
    </div>
  );
}
