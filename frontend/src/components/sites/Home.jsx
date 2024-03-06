import PostFeed from '../post/PostFeed';
import ContributeCard from './ContributeCard';
import MainSite from './MainSite';
import ProfileCard from './ProfileCard';

export default function Home() {
  return (
    <MainSite>
      <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full ">
          <ProfileCard />
        </div>

        <PostFeed />
        <div className="flex justify-end w-full ">
          <ContributeCard />
        </div>
      </div>
    </MainSite>
  );
}
