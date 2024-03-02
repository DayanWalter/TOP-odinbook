import CommentUpdate from './CommentUpdate';

export default function CommentEdit({ commentId }) {
  return (
    <>
      <div className="flex flex-col max-w-md p-5 -mt-5 bg-white border shadow-lg rounded-b-xl">
        <CommentUpdate commentId={commentId} />
      </div>
    </>
  );
}
