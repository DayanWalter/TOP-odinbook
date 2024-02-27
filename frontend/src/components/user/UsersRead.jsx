import { useEffect, useState } from 'react';
import UserList from './UserList';
import useFetch from '../../hooks/useFetch';

export default function UsersRead() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    data: users,
    loading,
    error,
  } = useFetch(`${BASE_URL}/api/user/all`, 'GET');

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {users && <UserList users={users} />}
    </>
  );
}
