// Hooks
import useUserFollow from "./useUserFollow";

export default function UserFollow({ userId, setIsFollowing }) {
  // Custom hooks
  const { userFollow } = useUserFollow();

  // Functions
  const handleFollowUser = async () => {
    userFollow(userId);
    setIsFollowing(true);
  };

  return (
    <div>
      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleFollowUser}
      >
        Follow User
      </button>
    </div>
  );
}
