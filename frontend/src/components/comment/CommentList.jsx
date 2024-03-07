// Components
import CommentCard from "./CommentCard";

// Hooks
import useFetchComments from "../../hooks/useFetchComments";

export default function CommentList({ postId }) {
  // Custom hooks
  const { data: comments, loading, error } = useFetchComments(postId);

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <p>Loading comments...</p>}

      {comments && (
        <ul className="flex flex-col gap-3 border-l">
          {/* Sort comments(Date) and map them on cards */}
          {comments
            .sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
            .map((comment) => (
              <li className="ml-10 " key={comment._id}>
                <CommentCard comment={comment} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
