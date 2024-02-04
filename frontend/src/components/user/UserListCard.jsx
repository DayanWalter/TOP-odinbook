import styles from '../../css/UserListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';

export default function UserListCard({
  user_name,
  avatar_url,
  reg_date,
  posts_id,
}) {
  return (
    <div className={styles.card}>
      {/* <div className={styles.profilePicture}> */}
      <img className={styles.roundedImage} src={avatar_url} alt="Avatar" />
      {/* </div> */}
      <div className={styles.stats}>
        <div>{user_name}</div>

        <div className={styles.iconGroup}>
          <Icon path={mdiChatOutline} size={1} />

          <div>{posts_id.length}</div>
        </div>
        <div className={styles.iconGroup}>
          <Icon path={mdiCalendarMonthOutline} size={1} />
          {new Date(reg_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
