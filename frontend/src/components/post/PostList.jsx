import PostListCard from './PostListCard';

export default function PostList({ posts }) {
  posts.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
  return (
    <ul className="flex flex-col items-center w-full">
      {posts.map((post) => (
        <li key={post._id} className="w-3/4 ">
          <PostListCard postId={post._id} />
        </li>
      ))}
    </ul>
  );
}
