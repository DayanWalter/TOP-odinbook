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
  const [showFollows, setShowFollows] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
        setShowFollows(false);
        setShowFollower(false);
        setShowPosts(false);
        setShowComments(false);
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

  const handleShowFollows = () => {
    showFollows ? setShowFollows(false) : setShowFollows(true);
  };
  const handleShowFollower = () => {
    showFollower ? setShowFollower(false) : setShowFollower(true);
  };
  const handleShowPosts = () => {
    showPosts ? setShowPosts(false) : setShowPosts(true);
  };
  const handleShowComments = () => {
    showComments ? setShowComments(false) : setShowComments(true);
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
          {/* Lists */}
          <div className={styles.lists}>
            <div className={styles.listGroup}>
              <p> {userData.follows_id.length} Following</p>
              {showFollows && userData.follows_id && (
                <UserList users={userData.follows_id} />
              )}
              <button onClick={handleShowFollows}>
                {showFollows ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={styles.listGroup}>
              <p>{userData.follower_id.length} Followers</p>
              {showFollower && userData.follower_id && (
                <UserList users={userData.follower_id} />
              )}
              <button onClick={handleShowFollower}>
                {showFollower ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={styles.listGroup}>
              <p>{userData.posts_id.length} Posts</p>
              {showPosts && userData.posts_id && (
                <PostList posts={userData.posts_id} />
              )}
              <button onClick={handleShowPosts}>
                {showPosts ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={styles.listGroup}>
              <p>{userData.comments_id.length} Comments</p>
              {showComments && userData.comments_id && (
                <CommentList comments={userData.comments_id} />
              )}
              <button onClick={handleShowComments}>
                {showComments ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {isFollowing ? (
            <UnFollowUser userId={userId} setIsFollowing={setIsFollowing} />
          ) : (
            <FollowUser userId={userId} setIsFollowing={setIsFollowing} />
          )}
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
