import Icon from "@mdi/react";
import { mdiCalendarMonthOutline } from "@mdi/js";
import { mdiChatOutline } from "@mdi/js";

export default function UserCard({ user }) {
  return (
    <div className="relative flex items-center max-w-sm gap-6 mx-auto overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl ">
      <img
        className="absolute object-cover w-24 h-24 rounded-full shadow-lg -left-6"
        src={user.avatar_url}
        alt="Avatar"
      />
      <div className="flex flex-col py-5 pl-24">
        <div>{user.user_name}</div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Icon path={mdiChatOutline} size={1} />

            <div>{user.posts_id.length}</div>
          </div>
          <div className="flex gap-2">
            <Icon path={mdiCalendarMonthOutline} size={1} />
            {new Date(user.reg_date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
