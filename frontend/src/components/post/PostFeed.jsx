import useFetchFeed from '../../hooks/useFetchFeed';
import PostListCard from './PostListCard';

export default function PostFeed() {
  const { data: feed, loading, error } = useFetchFeed();

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && (
        <ul className="grid gap-5">
          {feed.length === 0 && 'Start writing :)'}

          {feed
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((post) => (
              <li key={post._id}>
                <PostListCard postId={post._id} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
