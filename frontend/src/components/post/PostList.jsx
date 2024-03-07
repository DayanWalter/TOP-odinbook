// Components
import PostCard from "./PostCard";
// Hooks
import useFetchPosts from "../../hooks/useFetchPosts";

export default function PostList() {
  const { data: posts, loading, error } = useFetchPosts();

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <p>Loading list...</p>}
      {posts && (
        <ul className="grid gap-5">
          {/* If nothing is in the list */}
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
