// DeleteUser.jsx
import Icon from "@mdi/react";

import { mdiAlertOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

import useDeleteUser from "./useDeleteUser";

export default function UserDelete() {
  const navigate = useNavigate();

  const {
    deleteUser,
    loading: deleteUserLoading,
    error: deleteUserError,
  } = useDeleteUser();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    deleteUser();
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
