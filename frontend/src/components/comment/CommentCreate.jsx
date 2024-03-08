// React
import { useState } from "react";

// Hooks
import useCommentCreate from "../../hooks/useCommentCreate";

export default function CommentCreate({ postId }) {
  // Custom hooks
  const { commentCreate, loading, error } = useCommentCreate();

  // Hooks
  const [formData, setFormData] = useState("");

  // Functions
  const handleCreateComment = async () => {
    await commentCreate(postId, formData);
    setFormData("");
  };

  const handleChange = (e) => setFormData(e.target.value);

  return (
    <form
      id="createCommentForm"
      onSubmit={handleCreateComment}
      className="flex flex-col p-5 -mt-5 bg-white border shadow-lg rounded-b-xl"
    >
      <label htmlFor="formData">
        <textarea
          className="w-full p-2 mt-8 mb-5 border"
          placeholder="What is happening?"
          id="formData"
          type="text"
          name="formData"
          value={formData}
          onChange={handleChange}
          autoComplete="off"
          required={true}
        />
      </label>

      <button
        className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
        type="submit"
        disabled={loading}
      >
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? "Creating Comment..." : "Comment"}
      </button>
    </form>
  );
}
