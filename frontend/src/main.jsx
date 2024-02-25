import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Sites
import Index from './components/sites/Index.jsx';
import UserLogin from './components/user/UserLogin.jsx';
import UserCreate from './components/user/UserCreate.jsx';
import UserLogout from './components/user/UserLogout.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import Home from './components/sites/Home.jsx';

const router = createBrowserRouter([
  // User
  {
    path: '/signup',
    element: <UserCreate />,
  },
  {
    index: true,
    path: '/',
    element: <UserCreate />,
  },
  {
    path: '/home',
    element: <Home />,
  },

  {
    path: '/login',
    element: <UserLogin />,
  },
  {
    path: '/logout',
    element: <UserLogout />,
  },

  {
    path: '/user/:userid',
    element: <UserProfile />,
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
