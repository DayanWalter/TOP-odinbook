import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';

import usePostUnlike from '../../hooks/usePostUnlike';

export default function PostUnLike({ post, setIsLiking, setLikes }) {
  const { postUnlike } = usePostUnlike();

  const handleUnLikePost = async () => {
    setLikes((prev) => prev - 1);
    postUnlike(post._id);
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
