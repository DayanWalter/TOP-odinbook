import styles from '../../css/PostListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';

import PostEdit from './PostEdit';
import CommentCreate from '../comment/CommentCreate';

// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostLike from './PostLike';
import PostUnLike from './PostUnLike';

export default function PostListCard({
  postId,
  author,
  content,
  comments,
  likes,
  posting_date,
}) {
  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCommentCreate, setIsOpenCommentCreate] = useState(false);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  function searchForLikes(arr, loggedInUserId) {
    return arr.some((obj) => obj === loggedInUserId);
  }

  useEffect(() => {
    const isLikingPost = searchForLikes(likes, loggedInUserId);
    setIsLiking(isLikingPost);
  }, [likes, loggedInUserId]);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };
  const handlePostEdit = () => {
    console.log(postId);
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
      <div className={styles.card}>
        {/* <div className={styles.profilePicture}> */}
        {/* </div> */}
        {/* Button um modal zu öffnen um post updaten zu können */}
        <button onClick={handlePostEdit}>Post Edit</button>
        <button onClick={handleCommentCreate}>Comment Create</button>

        {/* <Link to={`/post/${postId}`}> */}
        <div className={styles.stats}>
          <div className={styles.author}>{author}</div>
          <div className={styles.content}>{content}</div>
          <div className={styles.footer}>
            <div className={styles.iconGroup}>
              <Icon
                onClick={handleShowCommentList}
                path={mdiChatOutline}
                size={1}
              />
              <div>{comments.length}</div>
            </div>
            <div className={styles.iconGroup}>
              {isLiking ? (
                <PostUnLike postId={postId} setIsLiking={setIsLiking} />
              ) : (
                <PostLike postId={postId} setIsLiking={setIsLiking} />
              )}
              <div>{likes.length}</div>
            </div>

            <div className={styles.iconGroup}>
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(posting_date).toLocaleDateString()}
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
          <CommentCreate postId={postId} />
        </div>
      )}
      {/* Todo: show real comment list under post */}
      {isOpenCommentList && <div>COMMENTLIST</div>}
    </>
  );
}
