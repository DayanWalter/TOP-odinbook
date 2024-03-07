export default function useCommentUnlike() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  const commentUnlike = async (commentId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/comment/${commentId}/unlike`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Comment successfully unliked.");
      } else {
        console.error("Error unliking comment:", response.status);
      }
    } catch (error) {
      console.error("Error unliking comment:", error);
    }
  };

  return { commentUnlike };
}
