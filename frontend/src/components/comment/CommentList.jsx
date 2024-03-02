import useFetchComments from '../../hooks/useFetchComments';
import CommentCard from './CommentCard';

export default function CommentList({ postId }) {
  // Search for comments from post
  const { data: comments, loading, error } = useFetchComments(postId);

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading comments...</p>}

      {comments && (
        <ul className="flex flex-col gap-3">
          {comments.length === 0 && 'Start writing :)'}
          {/* Sort comments(Date) and map them on cards */}
          {comments
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((comment) => (
              <li className="ml-5 border" key={comment._id}>
                <CommentCard comment={comment} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
