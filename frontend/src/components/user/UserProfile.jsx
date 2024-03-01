import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PostList from '../post/PostList';
import CommentList from '../comment/CommentList';
import UserUnFollow from './UserUnFollow';
import UserFollow from '../user/UserFollow';
import UserList from './UserList';

// Icons
import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiFeather } from '@mdi/js';

import UserUpdate from './UserUpdate';
import useFetchUser from '../../hooks/useFetchUser';
import useVerifyUser from '../../hooks/useVerifyUser';

export default function UserProfile() {
  // const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const { isLoggedInUser, userIdFromParams } = useVerifyUser();
  const { data, loading, error } = useFetchUser();

  //     const isFollowingUser = searchForFollower(
  //       data.searchedUser.follower_id,
  //       loggedInUserId
  //     );
  //     setIsFollowing(isFollowingUser);
  //

  const handleModal = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };

  // const handlePostCreateModal = () => {
  //   isOpenPostCreateModal
  //     ? setIsOpenPostCreateModal(false)
  //     : setIsOpenPostCreateModal(true);
  // };

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
      // setIsOpenPostCreateModal(false);
      // fetchUserData();
    }
  };

  // function searchForFollower(arr, loggedInUserId) {
  //   return arr.some((obj) => obj._id === loggedInUserId);
  // }

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div></div>}
      {data && (
        <>
          {/* Avatar and Background Image Section */}
          <div className="relative w-5/6 h-48 mx-auto mt-20 mb-10 overflow-hidden border rounded-md shadow-lg">
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

            {isLoggedInUser && (
              <div className="flex justify-between ">
                <button
                  className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
                  onClick={handleModal}
                >
                  Edit Profile
                </button>
                <button className="px-2 py-1 text-sm text-white border rounded-md bg-info hover:bg-info/80">
                  <Link to={'/logout'}>Logout</Link>
                </button>
              </div>
            )}

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
          <div className="flex flex-col items-start pb-5 mb-10 border-b sm:justify-between sm:flex-row">
            <button
              className={`  border-b-2 ${
                activeIndex === 1 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(1);
              }}
            >
              {data.follows_id.length} Following
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 2 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(2);
              }}
            >
              {data.follower_id.length} Followers
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 3 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(3);
              }}
            >
              {data.posts_id.length} Posts
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 4 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(4);
              }}
            >
              {data.comments_id.length} Comments
            </button>
          </div>

          {/* List Container */}
          <div className="mx-auto mt-20 w-fit ">
            {activeIndex === 1 && data.follows_id && (
              <UserList users={data.follows_id} />
            )}
            {activeIndex === 2 && data.follower_id && (
              <UserList users={data.follower_id} />
            )}
            {activeIndex === 3 && data.posts_id && <PostList />}
            {activeIndex === 4 && data.comments_id && (
              <CommentList comments={data.comments_id} />
            )}
          </div>

          {isOpenModal &&
            (isLoggedInUser ? (
              <div
                className="fixed inset-0 flex items-center justify-center bg-gray-500/50"
                id="overlay"
                onClick={handleOverlayClick}
              >
                <UserUpdate />
              </div>
            ) : (
              ''
            ))}

          {/* {isOpenPostCreateModal &&
            (isLoggedInUser ? (
              <div id="overlay" onClick={handleOverlayClick}>
                <div>
                  <PostCreate />
                </div>
              </div>
            ) : (
              ''
            ))} */}
        </>
      )}
      {/* {showButton && (
        <button title="Scroll Up" onClick={handleScrollUp}>
          <Icon path={mdiArrowUp} size={2} />
        </button>
      )} */}
    </>
  );
}
