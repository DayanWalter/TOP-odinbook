// Icons
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';

import { mdiFileEditOutline } from '@mdi/js';

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
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };

  return (
    <>
      {loading && <div></div>}
      {commentData && (
        <>
          <div className="relative flex items-center max-w-md gap-6 mx-auto overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl ">
            <Link to={`/user/${commentData.author_id._id}`}>
              <img
                className="absolute w-20 h-20 rounded-full shadow-lg -left-8 top-3"
                src={commentData.author_id.avatar_url}
                alt="Avatar"
              />
            </Link>

            <div className="flex flex-col w-full gap-5 p-5 pl-16">
              <div className="flex justify-between ">
                <div className="underline underline-offset-2 text-slate-500">
                  <Link to={`/user/${commentData.author_id._id}`}>
                    {commentData.author_id.user_name}
                  </Link>
                </div>

                <div>
                  {/* Open modal for editing post if user is author */}
                  {isAuthor ? (
                    <Icon
                      path={mdiFileEditOutline}
                      size={1}
                      onClick={handleCommentEdit}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <p className="break-all ">{commentData.content}</p>

              <div className="flex justify-between">
                <div className="flex">
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

                <div className="flex">
                  <Icon path={mdiCalendarMonthOutline} size={1} />
                  {new Date(commentData.posting_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          {isOpenModal && (
            <div id="overlay" onClick={handleOverlayClick}>
              <div>
                <CommentEdit commentId={commentId} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
