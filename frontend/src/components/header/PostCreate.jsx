// React
import { useState } from "react";

// Hooks
import useCreatePost from "./useCreatePost";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  // Custom hooks
  const { createPost, loading, error } = useCreatePost();

  // Hooks
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  // Functions
  const handleCreatePost = async (e) => {
    e.preventDefault();
    await createPost(formData);
    setFormData("");
    navigate(0);
  };

  const handleChange = (e) => setFormData(e.target.value);

  return (
    <>
      <h1 className="mb-5 text-xl border-b">Write a post</h1>
      <form
        id="createPostForm"
        onSubmit={handleCreatePost}
        className="z-20 flex flex-col gap-5"
      >
        <label htmlFor="formData">
          <textarea
            className="p-2 border"
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
          {loading ? "Creating Post..." : "Post"}
        </button>
      </form>
    </>
  );
}
