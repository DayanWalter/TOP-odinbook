import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
// Comment
import CommentList from '../comment/CommentList';
import CommentCreate from '../comment/CommentCreate';
// Post
import PostUnLike from './PostUnLike';
import PostLike from './PostLike';

import PostEdit from './PostEdit';

export default function ReadPost() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [isAuthor, setIsAuthor] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  //EDIT:
  const [isOpenModal, setIsOpenModal] = useState(false);

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
          `${BASE_URL}/api/post/${postId}`,
          requestOptions
        );
        const data = await response.json();
        setPostData(data.searchedPost);

        const isAuthorOfPost = searchForAuthor(
          data.searchedPost.author_id,
          loggedInUserId
        );
        setIsAuthor(isAuthorOfPost);

        const isLikingPost = searchForLikes(
          data.searchedPost.likes_id,
          loggedInUserId
        );
        setIsLiking(isLikingPost);
      } catch (error) {
        console.error('Error while fetching user:', error);
      } finally {
        setLoading(false);
        // remove show...
      }
    };

    fetchData();
  }, [postId, isLiking, authToken, loggedInUserId]);

  const handleShowComments = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  function searchForAuthor(author, loggedInUserId) {
    return author._id === loggedInUserId;
  }
  function searchForLikes(arr, loggedInUserId) {
    return arr.some((obj) => obj === loggedInUserId);
  }

  const handleModal = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };
  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };

  return (
    <div>
      {loading && <div></div>}
      {postData && (
        <>
          <button onClick={handleModal}>Edit Post</button>
          <p>ID: {postData._id}</p>
          <p>Content: {postData.content}</p>
          <p>Author: {postData.author_id.user_name}</p>
          <p>Has {postData.comments_id.length} Comments:</p>
          {showComments && postData.comments_id && (
            <CommentList comments={postData.comments_id} />
          )}
          <button onClick={handleShowComments}>
            {showComments ? 'Hide' : 'Show'}
          </button>
          <p>Has {postData.likes_id.length} likes</p>
          {isLiking ? (
            <PostUnLike postId={postId} setIsLiking={setIsLiking} />
          ) : (
            <PostLike postId={postId} setIsLiking={setIsLiking} />
          )}
          <CommentCreate postId={postId} />

          {isOpenModal &&
            (isAuthor ? (
              <div id="overlay" onClick={handleOverlayClick}>
                <div>
                  <PostEdit postId={postId} />
                </div>
              </div>
            ) : (
              ''
            ))}
        </>
      )}
    </div>
  );
}
