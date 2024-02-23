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
    <div>
      {/* <div className={styles.profilePicture}> */}
      <img src={avatar_url} alt="Avatar" />
      {/* </div> */}
      <div>
        <div>{user_name}</div>

        <div>
          <Icon path={mdiChatOutline} size={1} />

          <div>{posts_id.length}</div>
        </div>
        <div>
          <Icon path={mdiCalendarMonthOutline} size={1} />
          {new Date(reg_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
