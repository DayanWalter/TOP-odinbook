import styles from '../../css/PostListCard.module.css';
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

import PostEdit from './PostEdit';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PostListCard({
  postId,
  author,
  content,
  comments,
  likes,
  posting_date,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };
  const handlePostEdit = () => {
    console.log(postId);
    setIsOpenModal(true);
  };
  return (
    <>
      <div className={styles.card}>
        {/* <div className={styles.profilePicture}> */}
        {/* </div> */}
        {/* Button um modal zu öffnen um post updaten zu können */}
        <button onClick={handlePostEdit}>Post Edit</button>
        <Link to={`/post/${postId}`}>
          <div className={styles.stats}>
            <div className={styles.author}>{author}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.footer}>
              <div className={styles.iconGroup}>
                <Icon path={mdiChatOutline} size={1} />
                <div>{comments.length}</div>
              </div>
              <div className={styles.iconGroup}>
                <Icon path={mdiHeartOutline} size={1} />
                <div>{likes.length}</div>
              </div>

              <div className={styles.iconGroup}>
                <Icon path={mdiCalendarMonthOutline} size={1} />
                {new Date(posting_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Link>
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
    </>
  );
}
