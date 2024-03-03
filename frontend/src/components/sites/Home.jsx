import PostFeed from '../post/PostFeed';
import MainSite from './MainSite';
import ProfileCard from './ProfileCard';

export default function Home() {
  return (
    <MainSite>
      <div className="grid px-16 gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <ProfileCard />
        </div>

        <PostFeed />
        <div className="border">Empty col</div>
      </div>
    </MainSite>
  );
}
