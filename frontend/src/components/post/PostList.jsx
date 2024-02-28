import useFetchPosts from '../../hooks/useFetchPosts';
import PostCard from './PostCard';

export default function PostList() {
  const { data: feed, loading, error } = useFetchPosts();

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && (
        <ul className="grid gap-5">
          {/* If nothing is in the feed */}
          {feed.length === 0 && 'Start writing :)'}

          {/* Sort posts(Date) and map them on cards */}
          {feed
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((post) => (
              <li key={post._id}>
                <PostCard postId={post._id} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
