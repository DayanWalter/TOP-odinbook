import useFetchFeed from '../../hooks/useFetchFeed';
import PostCard from './PostCard';

export default function PostFeed() {
  const { data: feed, loading, error } = useFetchFeed();

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {feed && (
        <ul className="flex flex-col gap-5">
          {/* If nothing is in the feed */}
          {feed.length === 0 && 'Start writing :)'}

          {/* Sort posts(Date) and map them on cards */}
          {feed
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((post) => (
              <li className="bg-blue-300 " key={post._id}>
                <PostCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
