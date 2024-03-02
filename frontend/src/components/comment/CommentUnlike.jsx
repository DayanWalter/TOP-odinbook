import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';
import useCommentUnlike from '../../hooks/useCommentUnlike';

export default function CommentUnlike({ commentId, setIsLiking }) {
  const { commentUnlike } = useCommentUnlike();

  const handleUnlikeComment = async () => {
    commentUnlike(commentId);
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
