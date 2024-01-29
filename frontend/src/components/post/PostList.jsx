import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link to={`/post/${post._id}`}>{post.content}</Link>
        </li>
      ))}
    </ul>
  );
}
