import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';

export default function UserEdit() {
  return (
    <form>
      <UserUpdate />
      <UserDelete />
    </form>
  );
}
