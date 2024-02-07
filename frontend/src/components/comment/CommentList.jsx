import { Link } from 'react-router-dom';
import CommentListCard from './CommentListCard';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          <CommentListCard commentId={comment._id} />
        </li>
      ))}
    </ul>
  );
}
