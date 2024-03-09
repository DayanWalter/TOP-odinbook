// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import Icon from "@mdi/react";
import { mdiCalendarMonthOutline } from "@mdi/js";
import { mdiFileEditOutline } from "@mdi/js";

// Components
import CommentLike from "./CommentLike";
import CommentUnlike from "./CommentUnlike";
import CommentEdit from "./CommentEdit";

// Hooks
import useUserIsAuthor from "../../hooks/useUserIsAuthor";
import useUserIsLiking from "../../hooks/useUserIsLiking";

export default function CommentCard({ comment }) {
  // Custom hooks
  const { isAuthor } = useUserIsAuthor(comment);
  const { isLiking, setIsLiking } = useUserIsLiking(comment);

  // Hooks
  const [likes, setLikes] = useState(comment.likes_id.length);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  // Functions
  const handleCommentEdit = () => {
    isOpenUpdateModal
      ? setIsOpenUpdateModal(false)
      : setIsOpenUpdateModal(true);
  };
  return (
    <>
      <div
        id="commentCard"
        className="relative flex items-center gap-6 mt-2 overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl "
      >
        {/* Avatar */}
        <Link to={`/user/${comment.author_id._id}`}>
          <img
            className="absolute object-cover rounded-full shadow-lg w-14 h-14 left-3 top-3"
            src={comment.author_id.avatar_url}
            alt="Avatar"
          />
        </Link>

        <div className="flex flex-col w-full gap-5 p-5 pl-16">
          {/* Top part of card */}
          <div className="flex justify-between ">
            {/* Author Name */}
            <div className="underline underline-offset-2 text-slate-500">
              <Link to={`/user/${comment.author_id._id}`}>
                {comment.author_id.user_name}
              </Link>
            </div>
            {/* Edit Comment */}
            <div>
              {/* Open modal for editing comment if user is author */}
              {isAuthor ? (
                <Icon
                  className="hover:cursor-pointer"
                  path={mdiFileEditOutline}
                  size={1}
                  onClick={handleCommentEdit}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Content/middle part of card */}
          <p className="break-all ">{comment.content}</p>
          {/* Bottom part of card */}
          <div className="flex justify-between">
            {/* Comment like/unlike */}
            <div className="flex">
              {isLiking ? (
                <CommentUnlike
                  comment={comment}
                  setIsLiking={setIsLiking}
                  setLikes={setLikes}
                />
              ) : (
                <CommentLike
                  comment={comment}
                  setIsLiking={setIsLiking}
                  setLikes={setLikes}
                />
              )}

              <div>{likes}</div>
            </div>
            {/* Calendar */}
            <div className="flex">
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(comment.posting_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Below card */}
      {isOpenUpdateModal && (
        <>
          <CommentEdit commentId={comment._id} />
        </>
      )}
    </>
  );
}
