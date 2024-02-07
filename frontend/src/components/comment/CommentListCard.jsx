import styles from '../../css/CommentListCard.module.css';
// Icons
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';
import { useEffect, useState } from 'react';

export default function CommentListCard({ commentId }) {
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

  useEffect(() => {
    fetchCommentData();
  }, [commentId, isLiking, authToken, loggedInUserId]);

  return (
    <>
      {loading && <div></div>}
      {commentData && (
        <>
          <div className={styles.card}>
            {/* <div className={styles.profilePicture}> */}
            {/* </div> */}
            <div className={styles.stats}>
              <div className={styles.author}>
                {commentData.author_id.user_name}
              </div>
              <div className={styles.content}>{commentData.content}</div>
              <div className={styles.footer}>
                <div className={styles.iconGroup}>
                  <Icon path={mdiHeartOutline} size={1} />
                  <div>{commentData.likes_id.length}</div>
                </div>

                <div className={styles.iconGroup}>
                  <Icon path={mdiCalendarMonthOutline} size={1} />
                  {new Date(commentData.posting_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
