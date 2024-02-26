import CommentListCard from './CommentListCard';

export default function CommentList({ comments }) {
  comments.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));

  return (
    <ul className="grid gap-3 mt-3 ml-5">
      {comments.length === 0 && 'Start writing :)'}

      {comments.map((comment) => (
        <li key={comment._id}>
          <CommentListCard commentId={comment._id} />
        </li>
      ))}
    </ul>
  );
}
