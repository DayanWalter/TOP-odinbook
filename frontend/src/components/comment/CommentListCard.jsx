import styles from '../../css/CommentListCard.module.css';
// Icons
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';
import { mdiFileEditOutline } from '@mdi/js';
import { mdiChatPlusOutline } from '@mdi/js';

import { useEffect, useState } from 'react';

import CommentLike from './CommentLike';
import CommentUnlike from './CommentUnlike';
import CommentEdit from './CommentEdit';
import { Link } from 'react-router-dom';

export default function CommentListCard({ commentId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isAuthor, setIsAuthor] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCommentCreate, setIsOpenCommentCreate] = useState(false);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  function searchForAuthor(author, loggedInUserId) {
    return author._id === loggedInUserId;
  }

  function searchForLikes(arr, loggedInUserId) {
    return arr.some((obj) => obj === loggedInUserId);
  }

  const fetchCommentData = async () => {
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

  useEffect(() => {
    fetchCommentData();
  }, [commentId, isLiking, authToken, loggedInUserId]);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };
  const handleCommentEdit = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {loading && <div></div>}
      {commentData && (
        <>
          <div className={styles.card}>
            <div className={styles.editSection}>
              {/* Open modal for editing post if user is author */}
              {isAuthor ? (
                <Icon
                  path={mdiFileEditOutline}
                  size={1}
                  onClick={handleCommentEdit}
                  className={styles.icon}
                />
              ) : (
                ''
              )}
            </div>

            <div className={styles.stats}>
              <div className={styles.author}>
                <Link to={`/user/${commentData.author_id._id}`}>
                  {commentData.author_id.user_name}
                </Link>
              </div>
              <div className={styles.content}>{commentData.content}</div>
              <div className={styles.footer}>
                <div className={styles.iconGroup}>
                  {isLiking ? (
                    <CommentUnlike
                      commentId={commentId}
                      setIsLiking={setIsLiking}
                    />
                  ) : (
                    <CommentLike
                      commentId={commentId}
                      setIsLiking={setIsLiking}
                    />
                  )}

                  <div>{commentData.likes_id.length}</div>
                </div>

                <div className={styles.iconGroup}>
                  <Icon path={mdiCalendarMonthOutline} size={1} />
                  {new Date(commentData.posting_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          {isOpenModal && (
            <div
              id="overlay"
              className={styles.overlay}
              onClick={handleOverlayClick}
            >
              <div className={styles.modal}>
                <CommentEdit commentId={commentId} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
