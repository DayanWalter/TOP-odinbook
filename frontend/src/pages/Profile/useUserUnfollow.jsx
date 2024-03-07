export default function useUserUnfollow() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Functions
  const userUnfollow = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}/unfollow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log("User unfollowed successfully.");
      } else {
        console.error("Error unfollowing user:", response.status);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return { userUnfollow };
}
