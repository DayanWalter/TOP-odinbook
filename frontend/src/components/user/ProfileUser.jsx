import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import styles from './ProfileUser.module.css';
import PostList from '../post/PostList';
import CommentList from '../comment/CommentList';
import UnFollowUser from '../user/UnFollowUser';
import FollowUser from '../user/FollowUser';
import UserList from '../user/UserList';
import UpdateUser from '../user/UpdateUser';
import DeleteUser from '../user/DeleteUser';
// Icons
import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiCalendarMonthOutline } from '@mdi/js';

export default function ProfileUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  // id from params
  const loaderData = useLoaderData();
  const userId = loaderData.userid;

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  useEffect(() => {
    const fetchData = async () => {
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
          `http://localhost:3000/api/user/${userId}`,
          requestOptions
        );
        const data = await response.json();
        setUserData(data.searchedUser);

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
        setActiveIndex(0);
      }
    };

    fetchData();
  }, [userId, isFollowing, authToken, loggedInUserId]);

  const handleModal = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };
  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };

  function searchLoggedInUser(profileId, loggedInUserId) {
    return profileId === loggedInUserId;
  }

  function searchForFollower(arr, loggedInUserId) {
    return arr.some((obj) => obj._id === loggedInUserId);
  }

  return (
    <div className={styles.profileUserContainer}>
      {loading && <div></div>}
      {userData && (
        <>
          <h3>{userData.user_name}</h3>
          <div>{userData.posts_id.length} Posts</div>
          <div className={styles.heroImage}>
            <div className={styles.profilePicture}></div>
          </div>
          <button onClick={handleModal}>Edit Profile</button>
          {/* Main */}
          <div className={styles.contactInfo}>
            <h1>{userData.user_name}</h1>
            <p>I am funny and fresh!</p>
            <div className={styles.iconGroup}>
              <Icon path={mdiMapMarkerOutline} size={1} />
              New York
            </div>
            <div className={styles.iconGroup}>
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(userData.reg_date).toLocaleDateString()}
            </div>
          </div>
          {isFollowing ? (
            <UnFollowUser userId={userId} setIsFollowing={setIsFollowing} />
          ) : (
            <FollowUser userId={userId} setIsFollowing={setIsFollowing} />
          )}
          {/* Lists */}
          <div className={styles.listButtons}>
            <button
              className={`${styles.listButton} ${
                activeIndex === 0 ? styles.activeButton : ''
              }`}
              onClick={() => {
                setActiveIndex(0);
              }}
            >
              {userData.follows_id.length} Following
            </button>

            <button
              className={`${styles.listButton} ${
                activeIndex === 1 ? styles.activeButton : ''
              }`}
              onClick={() => {
                setActiveIndex(1);
              }}
            >
              {userData.follower_id.length} Followers
            </button>

            <button
              className={`${styles.listButton} ${
                activeIndex === 2 ? styles.activeButton : ''
              }`}
              onClick={() => {
                setActiveIndex(2);
              }}
            >
              {userData.posts_id.length} Posts
            </button>

            <button
              className={`${styles.listButton} ${
                activeIndex === 3 ? styles.activeButton : ''
              }`}
              onClick={() => {
                setActiveIndex(3);
              }}
            >
              {userData.comments_id.length} Comments
            </button>
          </div>
          <div className={styles.listContainer}>
            {activeIndex === 0 && userData.follows_id && (
              <UserList users={userData.follows_id} />
            )}
            {activeIndex === 1 && userData.follower_id && (
              <UserList users={userData.follower_id} />
            )}
            {activeIndex === 2 && userData.posts_id && (
              <PostList posts={userData.posts_id} />
            )}
            {activeIndex === 3 && userData.comments_id && (
              <CommentList comments={userData.comments_id} />
            )}
          </div>

          {
            isOpenModal &&
              (isLoggedInUser ? (
                <div
                  id="overlay"
                  className={styles.overlay}
                  onClick={handleOverlayClick}
                >
                  <div className={styles.modal}>
                    <UpdateUser />
                  </div>
                </div>
              ) : (
                ''
              ))
            // isLoggedInUser ? <DeleteUser /> : ''
          }
        </>
      )}
    </div>
  );
}