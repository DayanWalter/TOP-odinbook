import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';
import useCommentUnlike from '../../hooks/useCommentUnlike';

export default function CommentUnlike({ comment, setIsLiking, setLikes }) {
  const { commentUnlike } = useCommentUnlike();

  const handleUnlikeComment = async () => {
    setLikes((prev) => prev - 1);
    commentUnlike(comment._id);
    setIsLiking(false);
  };

  return (
    <div>
      <Icon
        onClick={handleUnlikeComment}
        className="text-red-600 hover:cursor-pointer"
        path={mdiHeart}
        size={1}
      />
    </div>
  );
}
