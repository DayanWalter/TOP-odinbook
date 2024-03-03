import PostFeed from '../post/PostFeed';
import MainSite from './MainSite';

export default function Home() {
  return (
    <MainSite>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        <div className="border">Profile Preview</div>
        <PostFeed />
        <div className="border">Empty col</div>
      </div>
    </MainSite>
  );
}
