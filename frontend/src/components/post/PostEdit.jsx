// React
import { useState, useEffect } from "react";

// Components
import PostUpdate from "./PostUpdate";
import PostDelete from "./PostDelete";

// Hooks
import useFetchPost from "../../hooks/useFetchPost";

export default function PostEdit({ postId }) {
  // Custom hooks
  const {
    data: postData,
    loading: fetchPostLoading,
    error: fetchPostError,
  } = useFetchPost(postId);

  // Hooks
  const [formData, setFormData] = useState("");

  // Effect
  useEffect(() => {
    if (postData) {
      setFormData(postData);
    }
  }, [postData]);

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
      {fetchPostError && <div>{fetchPostError}</div>}
      {fetchPostLoading && <div>Fetching Data...</div>}
      {formData && (
        <form
          id="editPostForm"
          className="flex flex-col p-5 -mt-5 bg-white border shadow-lg rounded-b-xl"
        >
          <label htmlFor="content">
            <textarea
              className="w-full mt-8 mb-5 p-2 border"
              id="content"
              type="text"
              name="content"
              defaultValue={formData.content}
              onChange={handleChange}
              autoComplete="off"
              required={true}
            />
          </label>

          <PostUpdate formData={formData} />
          <PostDelete formData={formData} />
        </form>
      )}
    </>
  );
}
