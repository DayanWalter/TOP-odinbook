import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginSite from './components/sites/LoginSite.jsx';
import ProfileSite from './components/sites/ProfileSite.jsx';
import IndexSite from './components/sites/IndexSite.jsx';
import CreateUser from './components/user/CreateUser.jsx';
import LoginUser from './components/user/LoginUser.jsx';
import DeleteUser from './components/user/DeleteUser.jsx';
import ReadUsers from './components/user/ReadUsers.jsx';
import UpdateUser from './components/user/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexSite />,
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
