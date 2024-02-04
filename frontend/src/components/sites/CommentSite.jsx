import styles from './Site.module.css';

import CommentRead from '../comment/CommentRead';

export default function CommentSite() {
  return (
    <div className={styles.profileSite}>
      <CommentRead />
    </div>
  );
}
