import { Link } from 'react-router-dom';
import PostListCard from './PostListCard';

export default function PostList({ posts }) {
  console.log(posts);
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link to={`/post/${post._id}`}>
            <PostListCard
              author_name={post.author_id.user_name}
              posting_date={post.posting_date}
              comments_id={post.comments_id}
              likes_id={post.likes_id}
              content={post.content}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
