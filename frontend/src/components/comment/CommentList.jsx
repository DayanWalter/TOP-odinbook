import { Link } from 'react-router-dom';

export default function CommentList({ comments }) {
  console.log(comments);
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Link to={`/comment/${comment._id}`}>
            <p>
              Content:
              {comment.content}
            </p>
            <p>Author:{comment.author_id.user_name}</p>

            <p>
              Written at:
              {new Date(comment.posting_date).toLocaleDateString()}
            </p>
            <p>Likes:{comment.likes_id.length}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
