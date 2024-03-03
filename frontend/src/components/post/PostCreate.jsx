import { useState } from 'react';
import useCreatePost from '../../hooks/useCreatePost';

export default function PostCreate() {
  const [formData, setFormData] = useState('');

  const { createPost, loading, error } = useCreatePost();

  const handleCreatePost = async () => {
    createPost(formData);
    setFormData('');
  };

  const handleChange = (e) => setFormData(e.target.value);

  return (
    <>
      <form id="createPostForm" onSubmit={handleCreatePost} className="z-20">
        <div>
          <label htmlFor="formData">
            <input
              className="border"
              id="formData"
              type="text"
              name="formData"
              value={formData}
              onChange={handleChange}
              autoComplete="off"
              required={true}
            />
          </label>
        </div>

        <button
          className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
          type="submit"
          disabled={loading}
        >
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {loading ? 'Creating Post...' : 'Write Post'}
        </button>
      </form>
    </>
  );
}
