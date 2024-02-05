import { Link } from 'react-router-dom';
import PostListCard from './PostListCard';

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <PostListCard
            postId={post._id}
            author={post.author_id.user_name}
            posting_date={post.posting_date}
            comments={post.comments_id}
            likes={post.likes_id}
            content={post.content}
          />
        </li>
      ))}
    </ul>
  );
}
