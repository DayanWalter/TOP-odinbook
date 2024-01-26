import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginSite from './components/sites/LoginSite.jsx';
import ProfileSite from './components/sites/ProfileSite.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <LoginSite />,
    // errorElement: <ErrorSite />,
  },

  // {
  //   index: true,
  //   element: <GreetingSite />,
  // },

  // {
  //   path: '/home/editprofile',
  //   element: <EditProfileSite />,
  // },
  {
    path: '/user/:userid',
    element: <ProfileSite />,
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
