import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";

export default function PostList() {
  const { data: posts, loading, error } = useFetchPosts();

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <p>Loading feed...</p>}
      {posts && (
        <ul className="grid gap-5">
          {/* If nothing is in the feed */}
          {posts.length === 0 && "Start writing :)"}

          {/* Sort posts(Date) and map them on cards */}
          {posts
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((post) => (
              <li key={post._id}>
                <PostCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
