import PostListCard from './PostListCard';

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <PostListCard postId={post._id} />
        </li>
      ))}
    </ul>
  );
}
