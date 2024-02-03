import styles from './Site.module.css';

import ReadPost from '../post/ReadPost';

export default function PostSite() {
  return (
    <div className={styles.profileSite}>
      <ReadPost />
    </div>
  );
}
