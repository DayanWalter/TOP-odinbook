// React
import { useEffect, useState } from "react";

// Components
import CommentUpdate from "./CommentUpdate";
import CommentDelete from "./CommentDelete";
// Hooks
import useFetchComment from "../../hooks/useFetchComment";

export default function CommentEdit({ commentId }) {
  // Custom hooks
  const {
    data: commentData,
    loading: fetchCommentLoading,
    error: fetchCommentError,
  } = useFetchComment(commentId);

  // Hooks
  const [formData, setFormData] = useState("");

  // Effect
  useEffect(() => {
    if (commentData) {
      setFormData(commentData);
    }
  }, [commentData]);

  // Functions
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
            <textarea
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
