import styles from './Site.module.css';

import ReadComment from '../comment/ReadComment';

export default function CommentSite() {
  return (
    <div className={styles.profileSite}>
      <ReadComment />
    </div>
  );
}
