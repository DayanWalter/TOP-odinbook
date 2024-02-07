import styles from '../../css/PostListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';
import { mdiFileEditOutline } from '@mdi/js';
import { mdiChatPlusOutline } from '@mdi/js';

import PostEdit from './PostEdit';
import CommentCreate from '../comment/CommentCreate';

// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostLike from './PostLike';
import PostUnLike from './PostUnLike';
import CommentList from '../comment/CommentList';

export default function PostListCard({ postId }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isAuthor, setIsAuthor] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCommentCreate, setIsOpenCommentCreate] = useState(false);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [commentCreated, setCommentCreated] = useState(null);

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

  const fetchPostData = async () => {
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

  useEffect(() => {
    fetchPostData();
  }, [postId, isLiking, commentCreated, authToken, loggedInUserId]);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };
  const handlePostEdit = () => {
    setIsOpenModal(true);
  };

  const handleCommentCreate = () => {
    isOpenCommentCreate
      ? setIsOpenCommentCreate(false)
      : setIsOpenCommentCreate(true);
  };
  const handleShowCommentList = () => {
    isOpenCommentList
      ? setIsOpenCommentList(false)
      : setIsOpenCommentList(true);
  };
  return (
    <>
      {loading && <div></div>}
      {postData && (
        <>
          <div className={styles.card}>
            <div className={styles.editSection}>
              {/* Open modal for editing post if user is author */}
              {isAuthor ? (
                <Icon
                  path={mdiFileEditOutline}
                  size={1}
                  onClick={handlePostEdit}
                />
              ) : (
                ''
              )}

              <Icon
                path={mdiChatPlusOutline}
                size={1}
                onClick={handleCommentCreate}
              />
            </div>

            <div className={styles.stats}>
              <div className={styles.author}>
                {postData.author_id.user_name}
              </div>
              <div className={styles.content}>{postData.content}</div>
              <div className={styles.footer}>
                <div className={styles.iconGroup}>
                  <Icon
                    onClick={handleShowCommentList}
                    path={mdiChatOutline}
                    size={1}
                  />
                  <div>{postData.comments_id.length}</div>
                </div>
                <div className={styles.iconGroup}>
                  {isLiking ? (
                    <PostUnLike postId={postId} setIsLiking={setIsLiking} />
                  ) : (
                    <PostLike postId={postId} setIsLiking={setIsLiking} />
                  )}
                  <div>{postData.likes_id.length}</div>
                </div>

                <div className={styles.iconGroup}>
                  <Icon path={mdiCalendarMonthOutline} size={1} />
                  {new Date(postData.posting_date).toLocaleDateString()}
                </div>
              </div>
            </div>
            {/* </Link> */}
          </div>
          {isOpenModal && (
            <div
              id="overlay"
              className={styles.overlay}
              onClick={handleOverlayClick}
            >
              <div className={styles.modal}>
                <PostEdit postId={postId} />
              </div>
            </div>
          )}
          {isOpenCommentCreate && (
            <div className={styles.commentCreate}>
              <CommentCreate
                postId={postId}
                commentCreated={commentCreated}
                setCommentCreated={setCommentCreated}
              />
            </div>
          )}
          {/* Todo: show real comment list under post */}
          <div className={styles.commentList}>
            {isOpenCommentList && (
              <CommentList comments={postData.comments_id} />
            )}
          </div>
        </>
      )}
    </>
  );
}
