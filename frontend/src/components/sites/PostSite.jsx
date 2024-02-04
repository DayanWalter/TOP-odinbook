import styles from './Site.module.css';

import PostRead from '../post/PostRead';

export default function PostSite() {
  return (
    <div className={styles.profileSite}>
      <PostRead />
    </div>
  );
}
