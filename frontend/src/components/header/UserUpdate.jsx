// React
import { useNavigate } from "react-router-dom";

// Hooks
import useUpdateUser from "./useUpdateUser";

export default function UserUpdate({ formData }) {
  // Custom hooks
  const {
    update,
    loading: updateUserLoading,
    error: updateUserError,
  } = useUpdateUser();

  // Hooks
  const navigate = useNavigate();

  // Functions
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await update(formData);
    navigate(0);
  };
  return (
    <>
      {updateUserError && <div>{updateUserError}</div>}
      {updateUserLoading && <div></div>}
      <button
        className="p-2 mb-5 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUpdateUser}
      >
        Update User
      </button>
    </>
  );
}
