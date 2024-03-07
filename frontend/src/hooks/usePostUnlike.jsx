export default function usePostUnlike() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Functions
  const postUnlike = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/post/${postId}/unlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log("Post successfully unliked.");
      } else {
        console.error("Error unliking post:", response.status);
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return { postUnlike };
}
