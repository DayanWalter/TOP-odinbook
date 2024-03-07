export default function useUserFollow() {
  // Variables
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const authToken = localStorage.getItem("authToken");

  // Functions
  const userFollow = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}/follow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log("User followed successfully.");
      } else {
        console.error("Error following user:", response.status);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return { userFollow };
}
