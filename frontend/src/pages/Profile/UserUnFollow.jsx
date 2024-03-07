// Hooks
import useUserUnfollow from "./useUserUnfollow";

export default function UserUnFollow({ userId, setIsFollowing }) {
  // Custom hooks
  const { userUnfollow } = useUserUnfollow();

  // Functions
  const handleUnFollowUser = async () => {
    userUnfollow(userId);
    setIsFollowing(false);
  };

  return (
    <div>
      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUnFollowUser}
      >
        UnFollow User
      </button>
    </div>
  );
}
