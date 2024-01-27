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
import ReadUserById from './components/user/ReadUserById.jsx';
import FollowUser from './components/user/FollowUser.jsx';
import CreatePost from './components/post/CreatePost.jsx';
import ReadFeedPosts from './components/post/ReadFeedPosts.jsx';
import ReadPostById from './components/post/ReadPostById.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexSite />,
    // errorElement: <ErrorSite />,
  },
  {
    path: '/user/:userid',
    element: <ReadUserById />,
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
    element: <ReadPostById />,
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
