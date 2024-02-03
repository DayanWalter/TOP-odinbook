import styles from '../user/UserListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';

export default function PostListCard({
  author_name,
  posting_date,
  comments_id,
  likes_id,
  content,
}) {
  return (
    <div className={styles.card}>
      {/* <div className={styles.profilePicture}> */}
      {/* </div> */}
      <div className={styles.stats}>
        <div>{author_name}</div>
        <div>{content}</div>

        <div className={styles.iconGroup}>
          <Icon path={mdiChatOutline} size={1} />
          <div>{comments_id.length}</div>
        </div>
        <div className={styles.iconGroup}>
          <Icon path={mdiChatOutline} size={1} />
          <div>{likes_id.length}</div>
        </div>

        <div className={styles.iconGroup}>
          <Icon path={mdiCalendarMonthOutline} size={1} />
          {new Date(posting_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
