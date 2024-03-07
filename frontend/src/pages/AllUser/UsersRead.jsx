import UserList from "../../components/user/UserList";
import useFetchUsers from "./useFetchUsers";

export default function UsersRead() {
  const { data: users, loading, error } = useFetchUsers();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {users && <UserList users={users} />}
    </>
  );
}
