import Icon from '@mdi/react';
import { mdiHeartOutline } from '@mdi/js';
import useCommentLike from '../../hooks/useCommentLike';

export default function CommentLike({ comment, setIsLiking, setLikes }) {
  const { commentLike } = useCommentLike();

  const handleLikeComment = async () => {
    setLikes((prev) => prev + 1);
    commentLike(comment._id);
    setIsLiking(true);
  };

  return (
    <div>
      <Icon
        onClick={handleLikeComment}
        className="text-red-600 hover:animate-ping hover:cursor-pointer "
        path={mdiHeartOutline}
        size={1}
      />
    </div>
  );
}
