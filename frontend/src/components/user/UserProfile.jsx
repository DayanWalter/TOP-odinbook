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

export default function UserProfile() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
  useEffect(() => {
    const userContainer = document.getElementById('profileUserContainer');

    const handleScrollButtonVisibility = () => {
      setShowButton(userContainer.scrollTop > 10);
    };

    userContainer.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      userContainer.removeEventListener('scroll', handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollUp = () => {
    document
      .getElementById('profileUserContainer')
      .scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModal = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };

  const handlePostCreateModal = () => {
    isOpenPostCreateModal
      ? setIsOpenPostCreateModal(false)
      : setIsOpenPostCreateModal(true);
  };

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
    <div id="profileUserContainer">
      {loading && <div></div>}
      {userData && (
        <>
          <div className="border">
            <Link to={`/user/${loggedInUserId}`}>
              <Icon path={mdiArrowLeft} size={1} />
              <p>{loggedInUserName}</p>
            </Link>
          </div>

          <div className="border ">
            <img src={userData.avatar_url} alt="Avatar" />
            <img src={userData.img_url} alt="Hero Image" />
          </div>

          <button onClick={handleModal}>Edit Profile</button>
          <Link to={'/logout'}>
            <button>Logout</button>
          </Link>

          {isLoggedInUser && (
            <div>
              <Icon
                path={mdiNotePlusOutline}
                size={2}
                onClick={handlePostCreateModal}
              />
            </div>
          )}

          {/* Main */}
          <div>
            <h1>{userData.user_name}</h1>
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
            <div>
              <div>
                <Icon path={mdiFeather} size={1} />
                {userData.bio}
              </div>
              <div>
                <Icon path={mdiMapMarkerOutline} size={1} />
                {userData.location}
              </div>
              <div>
                <Icon path={mdiCalendarMonthOutline} size={1} />
                {new Date(userData.reg_date).toLocaleDateString()}
              </div>
            </div>
          </div>
          {/* List Buttons */}
          <div>
            {isLoggedInUser && (
              <button
                onClick={() => {
                  setActiveIndex(0);
                }}
              >
                Feed
              </button>
            )}

            <button
              onClick={() => {
                setActiveIndex(1);
              }}
            >
              {userData.follows_id.length} Following
            </button>

            <button
              onClick={() => {
                setActiveIndex(2);
              }}
            >
              {userData.follower_id.length} Followers
            </button>

            <button
              onClick={() => {
                setActiveIndex(3);
              }}
            >
              {userData.posts_id.length} Posts
            </button>

            <button
              onClick={() => {
                setActiveIndex(4);
              }}
            >
              {userData.comments_id.length} Comments
            </button>
            {isLoggedInUser && (
              <button
                onClick={() => {
                  setActiveIndex(5);
                }}
              >
                All User
              </button>
            )}
          </div>
          {/* List Container */}
          <div>
            {activeIndex === 0 && <PostFeed />}
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
            {activeIndex === 5 && <UsersRead />}
          </div>

          {isOpenModal &&
            (isLoggedInUser ? (
              <div id="overlay" onClick={handleOverlayClick}>
                <div>
                  <UserEdit />
                </div>
              </div>
            ) : (
              ''
            ))}

          {isOpenPostCreateModal &&
            (isLoggedInUser ? (
              <div id="overlay" onClick={handleOverlayClick}>
                <div>
                  <PostCreate />
                </div>
              </div>
            ) : (
              ''
            ))}
        </>
      )}
      {showButton && (
        <button title="Scroll Up" onClick={handleScrollUp}>
          <Icon path={mdiArrowUp} size={2} />
        </button>
      )}
    </div>
  );
}
