import { Link } from 'react-router-dom';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Link to={`/comment/${comment._id}`}>{comment.content}</Link>
        </li>
      ))}
    </ul>
  );
}
