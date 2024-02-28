import PostList from './PostList';
import useFetchFeed from '../../hooks/useFetchFeed';

export default function PostFeed() {
  const { data: feed, loading, error } = useFetchFeed();

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && <PostList posts={feed} />}
    </>
  );
}
