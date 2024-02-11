import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import styles from '../../css/CommentRead.module.css';

import CommentUnlike from './CommentUnlike';
import CommentLike from './CommentLike';
import CommentUpdate from './CommentUpdate';
import CommentDelete from './CommentDelete';

export default function CommentRead() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  // id from params
  const loaderData = useLoaderData();
  const commentId = loaderData.commentid;

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
          `${BASE_URL}/api/comment/${commentId}`,
          requestOptions
        );
        const data = await response.json();
        setCommentData(data.searchedComment);

        const isAuthorOfComment = searchForAuthor(
          data.searchedComment.author_id,
          loggedInUserId
        );
        setIsAuthor(isAuthorOfComment);

        const isLikingComment = searchForLikes(
          data.searchedComment.likes_id,
          loggedInUserId
        );
        setIsLiking(isLikingComment);
      } catch (error) {
        console.error('Error while fetching comment:', error);
      } finally {
        setLoading(false);
        // remove show...
      }
    };

    fetchData();
  }, [commentId, isLiking, authToken, loggedInUserId]);

  //   const handleShowFollower = () => {
  //     showFollower ? setShowFollower(false) : setShowFollower(true);
  //   };

  function searchForAuthor(author, loggedInUserId) {
    return author._id === loggedInUserId;
  }
  function searchForLikes(arr, loggedInUserId) {
    return arr.some((obj) => obj === loggedInUserId);
  }

  return (
    <div className={styles.commentContainer}>
      {loading && <div></div>}
      {commentData && (
        <>
          <p>ID: {commentData._id}</p>
          <p>Content: {commentData.content}</p>
          <p>Author: {commentData.author_id.user_name}</p>
          <p>Has {commentData.likes_id.length} likes</p>
          {isLiking ? (
            <CommentUnlike commentId={commentId} setIsLiking={setIsLiking} />
          ) : (
            <CommentLike commentId={commentId} setIsLiking={setIsLiking} />
          )}
          {isAuthor ? <CommentUpdate commentId={commentId} /> : ''}
          {isAuthor ? <CommentDelete commentId={commentId} /> : ''}
        </>
      )}
    </div>
  );
}
