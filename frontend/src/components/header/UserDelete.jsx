// React
import { useNavigate } from "react-router-dom";

// Icons
import Icon from "@mdi/react";
import { mdiAlertOutline } from "@mdi/js";

// Components
import useDeleteUser from "./useDeleteUser";

export default function UserDelete() {
  // Custom hooks
  const {
    deleteUser,
    loading: deleteUserLoading,
    error: deleteUserError,
  } = useDeleteUser();

  // Hooks
  const navigate = useNavigate();

  // Functions
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    await deleteUser();
    navigate("/");
  };

  return (
    <>
      {deleteUserError && <div>{deleteUserError}</div>}
      {deleteUserLoading && <div>Delete User...</div>}

      <button
        className="flex justify-between px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
        onClick={handleDeleteUser}
      >
        <Icon path={mdiAlertOutline} size={0.9} />
        Delete User
        <Icon path={mdiAlertOutline} size={0.9} />
      </button>
    </>
  );
}
