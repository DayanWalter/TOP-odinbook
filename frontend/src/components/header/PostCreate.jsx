import { useState } from "react";
import useCreatePost from "./useCreatePost";

export default function PostCreate() {
  const [formData, setFormData] = useState("");

  const { createPost, loading, error } = useCreatePost();

  const handleCreatePost = async () => {
    createPost(formData);
    setFormData("");
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