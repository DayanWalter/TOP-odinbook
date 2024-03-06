import {  useState } from 'react';
import PostList from '../post/PostList';
import UserUnFollow from './UserUnFollow';
import UserFollow from '../user/UserFollow';
import UserList from './UserList';

// Icons
import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiFeather } from '@mdi/js';

import useFetchUser from '../../hooks/useFetchUser';
import useVerifyUser from '../../hooks/useVerifyUser';
import useUserIsFollowing from '../../hooks/useUserIsFollowing';

export default function UserProfile() {
  const { data, loading, error } = useFetchUser();
  // const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState('follower');

  // const [isOpenModal, setIsOpenModal] = useState(false);

  const { isFollowing, setIsFollowing } = useUserIsFollowing(data);

  const { isLoggedInUser, userIdFromParams } = useVerifyUser();


  // const handleOverlayClick = (event) => {
  //   if (event.target.id === 'overlay') {
  //     setIsOpenModal(false);
  //   }
  // };

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div></div>}
      {data && (
        <>
          {/* Avatar and Background Image Section */}
          <div className="relative w-full h-48 mx-auto mt-20 mb-10 overflow-hidden border rounded-md shadow-lg md:w-5/6">
            <img
              className="object-cover object-center w-full h-full "
              src={data.img_url}
              alt="Backgroundimage"
            />
            <img
              className="absolute -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-full shadow-lg h-44 w-44 md:translate-x-0 md:-left-8 top-1/2 left-1/2"
              src={data.avatar_url}
              alt="Avatar"
            />
          </div>

          {/* Main */}
          <div className="p-3 mb-5 bg-white rounded-lg sm:w-1/2">
            <h1 className="text-2xl ">{data.user_name}</h1>
            {/* Show follow/unfollow button, if profile is not logged in user */}

            {!isLoggedInUser &&
              (isFollowing ? (
                <UserUnFollow
                  userId={userIdFromParams}
                  setIsFollowing={setIsFollowing}
                />
              ) : (
                <UserFollow
                  userId={userIdFromParams}
                  setIsFollowing={setIsFollowing}
                />
              ))}
              
            <div className="mt-3 ">
              <div className="flex gap-3">
                <Icon path={mdiFeather} size={1} />
                {data.bio}
              </div>
              <div className="flex gap-3">
                <Icon path={mdiMapMarkerOutline} size={1} />
                {data.location}
              </div>
              <div className="flex gap-3">
                <Icon path={mdiCalendarMonthOutline} size={1} />
                {new Date(data.reg_date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* List Buttons */}
          <div className="flex flex-col items-start pb-5 mb-10 border-b sm:justify-around sm:flex-row">
            <button
              className={`border-b-2 rounded-sm px-2 py-1 hover:bg-slate-200 ${
                activeIndex === 'follows'
                  ? 'border-blue-600 '
                  : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex('follows');
              }}
            >
              {data.follows_id.length} Following
            </button>

            <button
              className={`border-b-2 rounded-sm px-2 py-1 hover:bg-slate-200 ${
                activeIndex === 'follower'
                  ? 'border-blue-600 '
                  : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex('follower');
              }}
            >
              {data.follower_id.length} Followers
            </button>

            <button
              className={`border-b-2 rounded-sm px-2 py-1 hover:bg-slate-200 ${
                activeIndex === 'posts'
                  ? 'border-blue-600 '
                  : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex('posts');
              }}
            >
              {data.posts_id.length} Posts
            </button>
          </div>

          {/* List Container */}
          <div className="mx-auto mt-20 sm:w-1/3 ">
            {activeIndex === 'follows' && data.follows_id && (
              <UserList users={data.follows_id} />
            )}
            {activeIndex === 'follower' && data.follower_id && (
              <UserList users={data.follower_id} />
            )}
            {activeIndex === 'posts' && data.posts_id && <PostList />}
          </div>
        </>
      )}
    </>
  );
}
