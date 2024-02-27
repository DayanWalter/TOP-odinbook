import PostList from './PostList';
import useFetch from '../../hooks/useFetch';

export default function PostFeed() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    data: feed,
    loading,
    error,
  } = useFetch(`${BASE_URL}/api/post/feed`, 'GET');

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && <PostList posts={feed} />}
    </>
  );
}
