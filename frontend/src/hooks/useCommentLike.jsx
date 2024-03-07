export default function useCommentLike() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Functions
  const commentLike = async (commentId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/comment/${commentId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Comment successfully liked.");
      } else {
        console.error("Error liking comment:", response.status);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return { commentLike };
}
