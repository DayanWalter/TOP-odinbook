import { useState, useEffect } from 'react';
import useFetchPost from '../../hooks/useFetchPost';
import PostUpdate from './PostUpdate';
import PostDelete from './PostDelete';

export default function PostEdit({ postId }) {
  const [formData, setFormData] = useState('');

  const {
    data: postData,
    loading: fetchPostLoading,
    error: fetchPostError,
  } = useFetchPost(postId);

  // Fetch post data, then setFormData
  useEffect(() => {
    if (postData) {
      setFormData(postData);
    }
  }, [postData]);

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

          <PostUpdate formData={formData} />
          <PostDelete formData={formData} />
        </form>
      )}
    </>
  );
}
