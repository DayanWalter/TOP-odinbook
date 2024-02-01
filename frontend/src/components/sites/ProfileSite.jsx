import styles from './Site.module.css';

import ProfileUser from '../user/ProfileUser';

export default function SignUpSite() {
  return (
    <div className={styles.profileSite}>
      <ProfileUser />
    </div>
  );
}
