import PostUpdate from './PostUpdate';

export default function PostEdit({ postId }) {
  return (
    <div className="flex flex-col max-w-md p-5 -mt-5 bg-white border shadow-lg rounded-b-xl">
      <PostUpdate postId={postId} />
    </div>
  );
}
