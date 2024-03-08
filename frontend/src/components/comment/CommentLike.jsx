// Icons
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";

// Hooks
import useCommentLike from "../../hooks/useCommentLike";

export default function CommentLike({ comment, setIsLiking, setLikes }) {
  // Custom hooks
  const { commentLike } = useCommentLike();

  // Functions
  const handleLikeComment = async () => {
    setLikes((prev) => prev + 1);
    await commentLike(comment._id);
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
