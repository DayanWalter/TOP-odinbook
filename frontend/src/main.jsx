import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IndexSite from './components/sites/IndexSite.jsx';
import CreateUser from './components/user/CreateUser.jsx';
import LoginUser from './components/user/LoginUser.jsx';
import DeleteUser from './components/user/DeleteUser.jsx';
import ReadUsers from './components/user/ReadUsers.jsx';
import UpdateUser from './components/user/UpdateUser.jsx';

import CreatePost from './components/post/CreatePost.jsx';
import ReadFeedPosts from './components/post/ReadFeedPosts.jsx';
import ProfileSite from './components/sites/ProfileSite.jsx';
import PostSite from './components/sites/PostSite.jsx';
import CommentSite from './components/sites/CommentSite.jsx';
import SignUpSite from './components/sites/SignUpSite.jsx';
import LoginSite from './components/sites/LoginSite.jsx';
import ErrorSite from './components/sites/ErrorSite.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexSite />,
    errorElement: <ErrorSite />,
  },

  // User
  {
    path: '/signup',
    element: <SignUpSite />,
  },
  {
    path: '/login',
    element: <LoginSite />,
  },
  {
    path: '/user/:userid',
    element: <ProfileSite />,
    loader({ params }) {
      return params;
    },
  },

  {
    path: '/user/create',
    element: <CreateUser />,
  },
  {
    path: '/user/login',
    element: <LoginUser />,
  },
  {
    path: '/user/delete',
    element: <DeleteUser />,
  },
  {
    path: '/users',
    element: <ReadUsers />,
  },
  {
    path: '/user/update',
    element: <UpdateUser />,
  },
  // Post
  {
    path: '/post/create',
    element: <CreatePost />,
  },
  {
    path: '/post/feed',
    element: <ReadFeedPosts />,
  },
  {
    path: '/post/:postid',
    element: <PostSite />,
    loader({ params }) {
      return params;
    },
  },
  // Comment
  {
    path: '/comment/:commentid',
    element: <CommentSite />,
    loader({ params }) {
      return params;
    },
  },
]);

// <CreateUser />
// <LoginUser />
// <ReadUsers />
// <DeleteUser />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
