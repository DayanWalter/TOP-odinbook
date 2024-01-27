import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default function ReadPostById() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  //   const [showFollower, setShowFollower] = useState(false);
  //   const [isFollowing, setIsFollowing] = useState(false);

  // id from params
  const loaderData = useLoaderData();
  const postId = loaderData.postid;

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
          `http://localhost:3000/api/post/${postId}`,
          requestOptions
        );
        const data = await response.json();
        setPostData(data.searchedPost);

        // const isFollowingUser = searchForFollower(
        //   data.searchedUser.follower_id,
        //   loggedInUserId
        // );
        // setIsFollowing(isFollowingUser);
      } catch (error) {
        console.error('Error while fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleShowComments = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };
  //   const handleShowFollower = () => {
  //     showFollower ? setShowFollower(false) : setShowFollower(true);
  //   };

  //   function searchForFollower(arr, loggedInUserId) {
  //     return arr.some((obj) => obj._id === loggedInUserId);
  //   }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {postData && (
        <>
          <div>ReadPostById</div>
          <h1>Post:</h1>
          <p>ID: {postData._id}</p>
          <p>Content: {postData.content}</p>
          <p>Author: {postData.author_id.user_name}</p>
          <button onClick={handleShowComments}>Show Comments</button>
        </>
      )}
    </div>
  );
}