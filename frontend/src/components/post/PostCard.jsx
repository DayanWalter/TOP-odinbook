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
import useUserIsAuthor from '../../hooks/useUserIsAuthor';
import useUserIsLiking from '../../hooks/useUserIsLiking';

export default function PostCard({ post }) {
  // const [post, setpost] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { isAuthor } = useUserIsAuthor(post);
  const { isLiking, setIsLiking } = useUserIsLiking(post);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenCommentCreate, setIsOpenCommentCreate] = useState(false);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);
  const [commentCreated, setCommentCreated] = useState(null);

  // function searchForAuthor(author, loggedInUserId) {
  //   return author._id === loggedInUserId;
  // }

  // function searchForLikes(arr, loggedInUserId) {
  //   return arr.some((obj) => obj === loggedInUserId);
  // }

  // const handleOverlayClick = (event) => {
  //   if (event.target.id === 'overlay') {
  //     setIsOpenModal(false);
  //   }
  // };
  const handlePostEdit = () => {
    isOpenUpdateModal
      ? setIsOpenUpdateModal(false)
      : setIsOpenUpdateModal(true);
  };

  const handleCommentCreate = () => {
    isOpenCommentCreate
      ? setIsOpenCommentCreate(false)
      : setIsOpenCommentCreate(true);
  };
  return (
    <>
      <div
        id="card"
        className="relative flex max-w-md gap-6 overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl"
      >
        <Link to={`/user/${post.author_id._id}`}>
          <img
            className="absolute w-20 h-20 rounded-full shadow-lg -left-8 top-3"
            src={post.author_id.avatar_url}
            alt="Avatar"
          />
        </Link>

        <div className="flex flex-col w-full gap-5 p-5 pl-16">
          <div className="flex justify-between ">
            {/* Author Name */}
            <div className="underline underline-offset-2 text-slate-500">
              <Link to={`/user/${post.author_id._id}`}>
                {post.author_id.user_name}
              </Link>
            </div>
            {/* Edit Comment */}
            <div>
              {/* Open modal for editing post if user is author */}
              {isAuthor ? (
                <Icon
                  className="hover:cursor-pointer"
                  path={mdiFileEditOutline}
                  size={1}
                  onClick={handlePostEdit}
                />
              ) : (
                ''
              )}
            </div>
          </div>

          <p className="break-all ">{post.content}</p>
          <div className="flex justify-between">
            {/* CommentIcon */}
            <div className="flex">
              <Icon
                className="hover:cursor-pointer"
                onClick={handleCommentCreate}
                path={mdiChatOutline}
                size={1}
              />
              <div>{post.comments_id.length}</div>
            </div>
            {/* LikeIcon */}
            <div className="flex">
              {isLiking ? (
                <PostUnLike postId={post._id} setIsLiking={setIsLiking} />
              ) : (
                <PostLike postId={post._id} setIsLiking={setIsLiking} />
              )}
              {/* length of array after like? */}
              <div>{post.likes_id.length}</div>
            </div>
            {/* CalendarIcon */}
            <div className="flex">
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(post.posting_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      {isOpenUpdateModal && (
        <>
          <PostEdit postId={post._id} />
        </>
      )}
      {isOpenCommentCreate && (
        <>
          <CommentCreate
            postId={post._id}
            commentCreated={commentCreated}
            setCommentCreated={setCommentCreated}
          />
          {/* <CommentList comments={post.comments_id} /> */}
        </>
      )}
    </>
  );
}
