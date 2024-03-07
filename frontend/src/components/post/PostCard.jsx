// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import Icon from "@mdi/react";
import { mdiCalendarMonthOutline } from "@mdi/js";
import { mdiChatOutline } from "@mdi/js";
import { mdiFileEditOutline } from "@mdi/js";

// Components
import PostEdit from "./PostEdit";
import CommentCreate from "../comment/CommentCreate";
import PostLike from "./PostLike";
import PostUnLike from "./PostUnLike";
import CommentList from "../comment/CommentList";

// Hooks
import useUserIsAuthor from "../../hooks/useUserIsAuthor";
import useUserIsLiking from "../../hooks/useUserIsLiking";

export default function PostCard({ post }) {
  // Custom hooks
  const { isAuthor } = useUserIsAuthor(post);
  const { isLiking, setIsLiking } = useUserIsLiking(post);

  // Hooks
  const [likes, setLikes] = useState(post.likes_id.length);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenCommentCreate, setIsOpenCommentCreate] = useState(false);

  // Effect

  // Functions
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
        id="postCard"
        className="relative flex gap-6 overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl"
      >
        {/* Avatar */}
        <Link to={`/user/${post.author_id._id}`}>
          <img
            className="absolute rounded-full shadow-lg w-14 h-14 left-3 top-3"
            src={post.author_id.avatar_url}
            alt="Avatar"
          />
        </Link>

        <div className="flex flex-col w-full gap-5 p-5 pl-16">
          {/* Top part of card */}
          <div className="flex justify-between ">
            {/* Author Name */}
            <div className="underline underline-offset-2 text-slate-500">
              <Link to={`/user/${post.author_id._id}`}>
                {post.author_id.user_name}
              </Link>
            </div>
            {/* Edit Post */}
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
                ""
              )}
            </div>
          </div>

          {/* Content/middle part of card */}
          <p className="break-all ">{post.content}</p>

          {/* Bottom part of card */}
          <div className="flex justify-between">
            {/* Comment create */}
            <div className="flex">
              <Icon
                className="hover:cursor-pointer"
                onClick={handleCommentCreate}
                path={mdiChatOutline}
                size={1}
              />
              <div>{post.comments_id.length}</div>
            </div>

            {/* Post like/unlike */}
            <div className="flex">
              {isLiking ? (
                <PostUnLike
                  post={post}
                  setIsLiking={setIsLiking}
                  setLikes={setLikes}
                />
              ) : (
                <PostLike
                  post={post}
                  setIsLiking={setIsLiking}
                  setLikes={setLikes}
                />
              )}
              <div>{likes}</div>
            </div>
            {/* Calendar*/}
            <div className="flex">
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(post.posting_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Below card */}
      {isOpenUpdateModal && (
        <>
          <PostEdit postId={post._id} />
        </>
      )}
      {isOpenCommentCreate && (
        <>
          <CommentCreate postId={post._id} />
          <CommentList postId={post._id} />
        </>
      )}
    </>
  );
}
