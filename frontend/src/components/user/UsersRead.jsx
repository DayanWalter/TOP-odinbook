import UserList from './UserList';
import useFetchUsers from '../../hooks/useFetchUsers';

export default function UsersRead() {
  const { data: users, loading, error } = useFetchUsers();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {users && <UserList users={users} />}
    </>
  );
}
