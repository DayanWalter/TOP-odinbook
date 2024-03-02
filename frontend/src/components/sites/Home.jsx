import PostFeed from '../post/PostFeed';
import MainSite from './MainSite';

export default function Home() {
  return (
    <MainSite>
      <div className="grid ">
        <PostFeed />
      </div>
    </MainSite>
  );
}
