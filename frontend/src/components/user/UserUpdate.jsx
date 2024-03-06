import { useState } from 'react';

import useUpdateUser from '../../hooks/useUpdateUser';

export default function UserUpdate({ formData }) {
  // After successfull update, display message
  const [success, setSuccess] = useState(false);

  const {
    update,
    loading: updateUserLoading,
    error: updateUserError,
  } = useUpdateUser();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    update(formData);
    setSuccess(true);
  };

  return (
    <>
      {updateUserError && <div>{updateUserError}</div>}
      {updateUserLoading && <div>Update User...</div>}

      <button
        className="p-2 mb-5 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        onClick={handleUpdateUser}
      >
        Update User
      </button>
      {success && <div style={{ color: 'green' }}>User updated!</div>}
    </>
  );
}
