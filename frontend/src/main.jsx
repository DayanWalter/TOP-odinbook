import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Sites
import ProfileSite from './components/sites/ProfileSite.jsx';
import SignUpSite from './components/sites/SignUpSite.jsx';
import LoginSite from './components/sites/LoginSite.jsx';
import LogoutSite from './components/sites/LogoutSite.jsx';
import Index from './components/sites/Index.jsx';

const router = createBrowserRouter([
  // User
  {
    path: '/signup',
    element: <SignUpSite />,
  },
  {
    index: true,
    path: '/',
    element: <Index />,
  },

  // {
  //   index: true,
  //   path: '/',
  //   element: <LoginSite />,
  // },
  {
    path: '/login',
    element: <LoginSite />,
  },
  {
    path: '/logout',
    element: <LogoutSite />,
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
