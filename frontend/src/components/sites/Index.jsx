import UserCreate from '../user/UserCreate';
import UserLogin from '../user/UserLogin';

export default function Index() {
  return (
    <>
      <div>All Components</div>
      <UserCreate />
      <UserLogin />
    </>
  );
}
