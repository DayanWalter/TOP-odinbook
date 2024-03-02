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

  // const handleDeletePost = async () => {
  //   const authToken = localStorage.getItem('authToken');

  //   // Parameters for the backend request
  //   const requestOptions = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/post/${postId}/delete`,
  //       requestOptions
  //     );

  //     if (response.status === 200) {
  //       console.log('Post deleted.');
  //     } else {
  //       console.error('Error deleting post:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  return (
    <>
      {fetchPostError && <div>{fetchPostError}</div>}
      {fetchPostLoading && <div>Fetching Data...</div>}
      {formData && (
        <form className="flex flex-col max-w-md p-5 -mt-5 bg-white border shadow-lg rounded-b-xl">
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

          <div className="flex justify-between">
            {/* <button
              className="px-2 py-1 text-sm text-white border rounded-md bg-primary hover:bg-primary/80"
              // onClick={handleUpdatePost}
            >
              Update Post
            </button> */}

            {/* <button
              className="px-2 py-1 text-sm text-white border rounded-md bg-danger hover:bg-danger/80"
              // onClick={handleDeletePost}
            >
              Delete Post
            </button> */}
          </div>
          {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
          {/* {success && <div style={{ color: 'green' }}>Post updated!</div>} */}
        </form>
      )}
    </>
  );
}
