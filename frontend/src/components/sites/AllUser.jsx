import PostFeed from '../post/PostFeed';
import UsersRead from '../user/UsersRead';
import ContributeCard from './ContributeCard';
import MainSite from './MainSite';
import ProfileCard from './ProfileCard';

export default function AllUser() {
  return (
    <MainSite>
      <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full ">
          <ProfileCard />
        </div>

        <UsersRead />
        <div className="flex justify-end w-full ">
          <ContributeCard />
        </div>
      </div>
    </MainSite>
  );
}
