// Icons
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';

import { mdiFileEditOutline } from '@mdi/js';

import { useEffect, useState } from 'react';

import CommentLike from './CommentLike';
import CommentUnlike from './CommentUnlike';
import CommentEdit from './CommentEdit';
import { Link } from 'react-router-dom';
import useUserIsAuthor from '../../hooks/useUserIsAuthor';
import useUserIsLiking from '../../hooks/useUserIsLiking';

export default function CommentCard({ comment }) {
  const { isAuthor } = useUserIsAuthor(comment);
  const { isLiking, setIsLiking } = useUserIsLiking(comment);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setIsOpenUpdateModal(false);
    }
  };
  const handleCommentEdit = () => {
    isOpenUpdateModal
      ? setIsOpenUpdateModal(false)
      : setIsOpenUpdateModal(true);
  };
  return (
    <>
      <div
        id="commentCard"
        className="relative flex items-center gap-6 overflow-hidden bg-white shadow-lg ring-1 ring-black/5 rounded-xl "
      >
        <Link to={`/user/${comment.author_id._id}`}>
          <img
            className="absolute w-20 h-20 rounded-full shadow-lg -left-8 top-3"
            src={comment.author_id.avatar_url}
            alt="Avatar"
          />
        </Link>

        <div className="flex flex-col w-full gap-5 p-5 pl-16">
          <div className="flex justify-between ">
            <div className="underline underline-offset-2 text-slate-500">
              <Link to={`/user/${comment.author_id._id}`}>
                {comment.author_id.user_name}
              </Link>
            </div>

            <div>
              {/* Open modal for editing post if user is author */}
              {isAuthor ? (
                <Icon
                  className="hover:cursor-pointer"
                  path={mdiFileEditOutline}
                  size={1}
                  onClick={handleCommentEdit}
                />
              ) : (
                ''
              )}
            </div>
          </div>

          <p className="break-all ">{comment.content}</p>

          <div className="flex justify-between">
            <div className="flex">
              {isLiking ? (
                <CommentUnlike
                  commentId={comment._id}
                  setIsLiking={setIsLiking}
                />
              ) : (
                <CommentLike
                  commentId={comment._id}
                  setIsLiking={setIsLiking}
                />
              )}

              <div>{comment.likes_id.length}</div>
            </div>

            <div className="flex">
              <Icon path={mdiCalendarMonthOutline} size={1} />
              {new Date(comment.posting_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      {isOpenUpdateModal && (
        <>
          <CommentEdit commentId={comment._id} />
        </>
      )}
    </>
  );
}
