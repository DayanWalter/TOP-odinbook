// Components
import UserList from "../../components/user/UserList";

// Hooks
import useFetchUsers from "./useFetchUsers";

export default function UsersRead() {
  // Custom hooks
  const { data, loading, error } = useFetchUsers();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {data && <UserList users={data} />}
    </>
  );
}
