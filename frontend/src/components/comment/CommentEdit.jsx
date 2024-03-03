import { useEffect, useState } from 'react';
import CommentUpdate from './CommentUpdate';
import useFetchComment from '../../hooks/useFetchComment';
import CommentDelete from './CommentDelete';

export default function CommentEdit({ commentId }) {
  const [formData, setFormData] = useState('');
  const {
    data: commentData,
    loading: fetchCommentLoading,
    error: fetchCommentError,
  } = useFetchComment(commentId);

  // Fetch post data, then setFormData
  useEffect(() => {
    if (commentData) {
      setFormData(commentData);
    }
  }, [commentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {fetchCommentError && <div>{fetchCommentError}</div>}
      {fetchCommentLoading && <div>Fetching Data...</div>}
      {formData && (
        <form
          id="editCommentForm"
          className="flex flex-col p-5 -mt-5 bg-white border shadow-lg rounded-b-xl"
        >
          <label htmlFor="content">
            <input
              className="w-full mt-8 mb-5 border"
              id="content"
              type="text"
              name="content"
              defaultValue={formData.content}
              onChange={handleChange}
              autoComplete="off"
              required={true}
            />
          </label>

          <CommentUpdate formData={formData} />
          <CommentDelete formData={formData} />
        </form>
      )}
    </>
  );
}
