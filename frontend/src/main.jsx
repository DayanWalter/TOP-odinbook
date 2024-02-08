import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Sites
import IndexSite from './components/sites/IndexSite.jsx';
import ProfileSite from './components/sites/ProfileSite.jsx';
import PostSite from './components/sites/PostSite.jsx';
import CommentSite from './components/sites/CommentSite.jsx';
import SignUpSite from './components/sites/SignUpSite.jsx';
import LoginSite from './components/sites/LoginSite.jsx';
import ErrorSite from './components/sites/ErrorSite.jsx';
// User
import UserCreate from './components/user/UserCreate.jsx';
import UserLogin from './components/user/UserLogin.jsx';
import UserDelete from './components/user/UserDelete.jsx';
import UsersRead from './components/user/UsersRead.jsx';
import UserUpdate from './components/user/UserUpdate.jsx';
// Post
import PostCreate from './components/post/PostCreate.jsx';
import PostFeed from './components/post/PostFeed.jsx';

const router = createBrowserRouter([
  // User
  {
    path: '/signup',
    element: <SignUpSite />,
  },
  {
    index: true,
    path: '/',
    element: <LoginSite />,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
