import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import styles from '../../css/CommentRead.module.css';

import UnLikeComment from '../comment/UnLikeComment';
import LikeComment from '../comment/LikeComment';
import UpdateComment from '../comment/UpdateComment';
import DeleteComment from '../comment/DeleteComment';

export default function CommentSite() {
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
          `http://localhost:3000/api/comment/${commentId}`,
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
            <UnLikeComment commentId={commentId} setIsLiking={setIsLiking} />
          ) : (
            <LikeComment commentId={commentId} setIsLiking={setIsLiking} />
          )}
          {isAuthor ? <UpdateComment commentId={commentId} /> : ''}
          {isAuthor ? <DeleteComment commentId={commentId} /> : ''}
        </>
      )}
    </div>
  );
}
