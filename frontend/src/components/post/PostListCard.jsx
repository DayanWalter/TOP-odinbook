import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import { mdiChatOutline } from '@mdi/js';
import { mdiFileEditOutline } from '@mdi/js';

import PostEdit from './PostEdit';
import CommentCreate from '../comment/CommentCreate';

// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostLike from './PostLike';
import PostUnLike from './PostUnLike';
import CommentList from '../comment/CommentList';
import { Link } from 'react-router-dom';

export default function PostListCard({ postId }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

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

  useEffect(() => {
    fetchPostData();
  }, [postId, isLiking, commentCreated, authToken, loggedInUserId]);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenModal(false);
    }
  };
  const handlePostEdit = () => {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  };

  const handleCommentCreate = () => {
    isOpenCommentCreate
      ? setIsOpenCommentCreate(false)
      : setIsOpenCommentCreate(true);
  };
  return (
    <>
      {loading && <div></div>}
      {postData && (
        <>
          <div
            id="card"
            className="relative flex items-center max-w-md gap-6 mx-auto overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl "
          >
            <Link to={`/user/${postData.author_id._id}`}>
              <img
                className="absolute w-20 h-20 rounded-full shadow-lg -left-8 top-3"
                src={postData.author_id.avatar_url}
                alt="Avatar"
              />
            </Link>

            <div className="flex flex-col w-full gap-5 p-5 pl-16">
              <div className="flex justify-between ">
                {/* Author Name */}
                <div className="underline underline-offset-2 text-slate-500">
                  <Link to={`/user/${postData.author_id._id}`}>
                    {postData.author_id.user_name}
                  </Link>
                </div>
                {/* Edit Comment */}
                <div>
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
                </div>
              </div>

              <p className="break-all ">{postData.content}</p>
              <div className="flex justify-between">
                {/* CommentIcon */}
                <div className="flex">
                  <Icon
                    onClick={handleCommentCreate}
                    path={mdiChatOutline}
                    size={1}
                  />
                  <div>{postData.comments_id.length}</div>
                </div>
                {/* LikeIcon */}
                <div className="flex">
                  {isLiking ? (
                    <PostUnLike postId={postId} setIsLiking={setIsLiking} />
                  ) : (
                    <PostLike postId={postId} setIsLiking={setIsLiking} />
                  )}
                  <div>{postData.likes_id.length}</div>
                </div>
                {/* CalendarIcon */}
                <div className="flex">
                  <Icon path={mdiCalendarMonthOutline} size={1} />
                  {new Date(postData.posting_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          {isOpenModal && (
            <div id="overlay" onClick={handleOverlayClick}>
              <div>
                <PostEdit postId={postId} />
              </div>
            </div>
          )}
          {isOpenCommentCreate && (
            <div>
              <div>
                <CommentCreate
                  postId={postId}
                  commentCreated={commentCreated}
                  setCommentCreated={setCommentCreated}
                />
              </div>
              <div>
                <CommentList comments={postData.comments_id} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
