// DeleteUser.jsx
import styles from '../../css/Form.module.css';
import Icon from '@mdi/react';

import { mdiAlertOutline } from '@mdi/js';

export default function UserDelete() {
  const handleDeleteUser = async () => {
    const authToken = localStorage.getItem('authToken');

    // Parameters for the backend request
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/user/delete',
        requestOptions
      );

      if (response.status === 200) {
        console.log('User deleted.');
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div id="deleteUser">
      <button className={styles.deleteButton} onClick={handleDeleteUser}>
        <Icon path={mdiAlertOutline} size={1} />
        Delete User
      </button>
    </div>
  );
}
