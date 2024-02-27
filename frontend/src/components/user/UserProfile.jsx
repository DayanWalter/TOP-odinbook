import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PostList from '../post/PostList';
import CommentList from '../comment/CommentList';
import UserUnFollow from './UserUnFollow';
import UserFollow from '../user/UserFollow';
import UserList from './UserList';
import UserEdit from './UserEdit';

// Icons
import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiArrowUp } from '@mdi/js';
import { mdiFeather } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import { mdiNotePlusOutline } from '@mdi/js';

import PostFeed from '../post/PostFeed';
import PostCreate from '../post/PostCreate';
import UsersRead from './UsersRead';
import UserUpdate from './UserUpdate';
import Header from '../sites/Header';
import MainSite from '../sites/MainSite';

export default function UserProfile() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenPostCreateModal, setIsOpenPostCreateModal] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const [showButton, setShowButton] = useState(false);
  // id from params
  const loaderData = useLoaderData();
  const userIdFromParams = loaderData.userid;

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;
  const loggedInUserName = payload.user_name;

  const fetchUserData = async () => {
    // Parameters for the backend request
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/user/${userIdFromParams}`,
        requestOptions
      );
      const data = await response.json();
      setUserData(data.searchedUser);

      // Check if the user is logged in user
      const userIsLoggedIn = searchLoggedInUser(
        data.searchedUser._id,
        loggedInUserId
      );

      setIsLoggedInUser(userIsLoggedIn);

      const isFollowingUser = searchForFollower(
        data.searchedUser.follower_id,
        loggedInUserId
      );
      setIsFollowing(isFollowingUser);
    } catch (error) {
      console.error('Error while fetching user:', error);
    } finally {
      setLoading(false);
    }
  };
  // Get Profile(User) Data
  useEffect(() => {
    fetchUserData();
  }, [userIdFromParams, isFollowing, authToken, loggedInUserId, activeIndex]);

  // ScrollUp Button
  // useEffect(() => {
  //   const userContainer = document.getElementById('profileUserContainer');

  //   const handleScrollButtonVisibility = () => {
  //     setShowButton(userContainer.scrollTop > 10);
  //   };

  //   userContainer.addEventListener('scroll', handleScrollButtonVisibility);

  //   return () => {
  //     userContainer.removeEventListener('scroll', handleScrollButtonVisibility);
  //   };
  // }, []);

  // const handleScrollUp = () => {
  //   document
  //     .getElementById('profileUserContainer')
  //     .scrollTo({ top: 0, behavior: 'smooth' });
  // };

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
      setIsOpenPostCreateModal(false);
      fetchUserData();
    }
  };

  function searchLoggedInUser(profileId, loggedInUserId) {
    return profileId === loggedInUserId;
  }

  function searchForFollower(arr, loggedInUserId) {
    return arr.some((obj) => obj._id === loggedInUserId);
  }

  return (
    <>
      {loading && <div></div>}
      {userData && (
        <>
          {/* Avatar and Background Image Section */}
          <div className="relative w-5/6 h-48 mx-auto mt-20 mb-10 overflow-hidden border rounded-md shadow-lg">
            <img
              className="object-cover object-center w-full h-full "
              src={userData.img_url}
              alt="Backgroundimage"
            />
            <img
              className="absolute -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-full shadow-lg h-44 w-44 md:translate-x-0 md:-left-8 top-1/2 left-1/2"
              src={userData.avatar_url}
              alt="Avatar"
            />
          </div>

          {/* {isLoggedInUser && (
            <div>
              <Icon
                path={mdiNotePlusOutline}
                size={2}
                onClick={handlePostCreateModal}
              />
            </div>
          )} */}

          {/* Main */}
          <div className="p-3 mb-5 bg-white rounded-lg sm:w-1/2">
            <h1 className="text-2xl ">{userData.user_name}</h1>
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
                {userData.bio}
              </div>
              <div className="flex gap-3">
                <Icon path={mdiMapMarkerOutline} size={1} />
                {userData.location}
              </div>
              <div className="flex gap-3">
                <Icon path={mdiCalendarMonthOutline} size={1} />
                {new Date(userData.reg_date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* List Buttons */}
          <div className="flex flex-col items-start pb-5 mb-10 border-b sm:justify-between sm:flex-row">
            {/* {isLoggedInUser && (
              <button
                onClick={() => {
                  setActiveIndex(0);
                }}
              >
                Feed
              </button>
            )} */}

            <button
              className={`  border-b-2 ${
                activeIndex === 1 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(1);
              }}
            >
              {userData.follows_id.length} Following
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 2 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(2);
              }}
            >
              {userData.follower_id.length} Followers
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 3 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(3);
              }}
            >
              {userData.posts_id.length} Posts
            </button>

            <button
              className={`  border-b-2 ${
                activeIndex === 4 ? 'border-blue-600 ' : ' border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(4);
              }}
            >
              {userData.comments_id.length} Comments
            </button>
          </div>

          {/* List Container */}
          <div className="mx-auto mt-20 w-fit ">
            {activeIndex === 1 && userData.follows_id && (
              <UserList users={userData.follows_id} />
            )}
            {activeIndex === 2 && userData.follower_id && (
              <UserList users={userData.follower_id} />
            )}
            {activeIndex === 3 && userData.posts_id && (
              <PostList posts={userData.posts_id} />
            )}
            {activeIndex === 4 && userData.comments_id && (
              <CommentList comments={userData.comments_id} />
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
