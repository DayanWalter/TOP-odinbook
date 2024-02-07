import { Link } from 'react-router-dom';
import CommentListCard from './CommentListCard';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Link to={`/comment/${comment._id}`}>
            <CommentListCard
              author={comment.author_id.user_name}
              posting_date={comment.posting_date}
              likes={comment.likes_id}
              content={comment.content}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
