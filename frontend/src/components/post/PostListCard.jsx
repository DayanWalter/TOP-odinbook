import styles from './PostListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

export default function PostListCard({
  author,
  content,
  comments,
  likes,
  posting_date,
}) {
  return (
    <div className={styles.card}>
      {/* <div className={styles.profilePicture}> */}
      {/* </div> */}
      <div className={styles.stats}>
        <div>{author}</div>
        <div>{content}</div>

        <div className={styles.iconGroup}>
          <Icon path={mdiChatOutline} size={1} />
          <div>{comments.length}</div>
        </div>
        <div className={styles.iconGroup}>
          <Icon path={mdiHeartOutline} size={1} />
          <div>{likes.length}</div>
        </div>

        <div className={styles.iconGroup}>
          <Icon path={mdiCalendarMonthOutline} size={1} />
          {new Date(posting_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
