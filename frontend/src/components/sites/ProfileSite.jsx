import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import FollowList from '../user/UserList';
import PostList from '../post/PostList';
import CommentList from '../comment/CommentList';
import UnFollowUser from '../user/UnFollowUser';
import FollowUser from '../user/FollowUser';
import UserList from '../user/UserList';

export default function ProfileSite() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFollows, setShowFollows] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  function searchForFollower(arr, loggedInUserId) {
    return arr.some((obj) => obj._id === loggedInUserId);
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {userData && (
        <>
          <div>ProfileSite.jsx</div>
          <h1>User Profile:</h1>
          <p>ID: {userData._id}</p>
          <p>Name: {userData.user_name}</p>
          <p>Email: {userData.email}</p>
          <p>Follows:</p>
          {showFollows && userData.follows_id && (
            <UserList users={userData.follows_id} />
          )}
          <button onClick={handleShowFollows}>
            {showFollows ? 'Hide' : 'Show'}
          </button>
          <p>Follower:</p>
          {showFollower && userData.follower_id && (
            <UserList users={userData.follower_id} />
          )}
          <button onClick={handleShowFollower}>
            {showFollower ? 'Hide' : 'Show'}
          </button>
          <p>Posts:</p>
          {showPosts && userData.posts_id && (
            <PostList posts={userData.posts_id} />
          )}
          <button onClick={handleShowPosts}>
            {showPosts ? 'Hide' : 'Show'}
          </button>
          <p>Comments:</p>
          {showComments && userData.comments_id && (
            <CommentList comments={userData.comments_id} />
          )}
          <button onClick={handleShowComments}>
            {showComments ? 'Hide' : 'Show'}
          </button>
          {isFollowing ? (
            <UnFollowUser userId={userId} setIsFollowing={setIsFollowing} />
          ) : (
            <FollowUser userId={userId} setIsFollowing={setIsFollowing} />
          )}
          <button>Private Message</button>
        </>
      )}
    </div>
  );
}
