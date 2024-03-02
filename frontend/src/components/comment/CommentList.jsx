import useFetchComments from '../../hooks/useFetchComments';
import CommentCard from './CommentCard';

export default function CommentList({ postId }) {
  // Search for comments from post
  const { data: comments, loading, error } = useFetchComments(postId);
  console.log(comments);

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading comments...</p>}

      {comments && (
        <ul className="grid gap-3 mt-3 ml-5">
          {comments.length === 0 && 'Start writing :)'}
          {/* Sort comments(Date) and map them on cards */}
          {comments
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((comment) => (
              <li key={comment._id}>
                {console.log(comment)}
                <CommentCard comment={comment} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
