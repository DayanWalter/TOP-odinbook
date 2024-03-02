import UsersRead from '../user/UsersRead';
import MainSite from './MainSite';

export default function AllUser() {
  return (
    <>
      <MainSite>
        <div className="grid grid-cols-3">
          <UsersRead />
          <UsersRead />
          <UsersRead />
        </div>
      </MainSite>
    </>
  );
}
