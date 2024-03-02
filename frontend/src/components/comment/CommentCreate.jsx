import { useState } from 'react';
import useCommentCreate from '../../hooks/useCommentCreate';

export default function CommentCreate({ post }) {
  const [formData, setFormData] = useState('');

  const { commentCreate, loading, error } = useCommentCreate();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    commentCreate(post, formData);
    setFormData('');
  };

  const handleChange = (e) => setFormData(e.target.value);

  return (
    <form
      id="createCommentForm"
      onSubmit={handleCreateComment}
      className="max-w-md p-5 -mt-5 bg-white border shadow-lg rounded-b-xl"
    >
      <div>
        <label htmlFor="formData">
          <input
            className="w-full mt-8 mb-5 border"
            id="formData"
            value={formData}
            onChange={handleChange}
            autoComplete="off"
            required={true}
            type="text"
          />
        </label>
      </div>

      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        type="submit"
        disabled={loading}
      >
        {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
        {loading ? 'Creating Comment...' : 'Create Comment'}
      </button>
    </form>
  );
}
