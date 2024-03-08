// Icons
import Icon from "@mdi/react";
import { mdiHeart } from "@mdi/js";

// Hooks
import usePostUnlike from "../../hooks/usePostUnlike";

export default function PostUnLike({ post, setIsLiking, setLikes }) {
  // Custom hooks
  const { postUnlike } = usePostUnlike();

  // Functions
  const handleUnLikePost = async () => {
    setLikes((prev) => prev - 1);
    await postUnlike(post._id);
    setIsLiking(false);
  };

  return (
    <div>
      <Icon
        onClick={handleUnLikePost}
        path={mdiHeart}
        className="text-red-600 hover:cursor-pointer"
        size={1}
      />
    </div>
  );
}
