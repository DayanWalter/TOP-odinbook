// Icons
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";

// Hooks
import usePostLike from "../../hooks/usePostLike";

export default function PostLike({ post, setIsLiking, setLikes }) {
  // Custom hooks
  const { postLike } = usePostLike();

  // Functions
  const handleLikePost = () => {
    setLikes((prev) => prev + 1);
    postLike(post._id);
    setIsLiking(true);
  };
  return (
    <div>
      <Icon
        onClick={handleLikePost}
        className="text-red-600 hover:animate-ping hover:cursor-pointer "
        path={mdiHeartOutline}
        size={1}
      />
    </div>
  );
}
