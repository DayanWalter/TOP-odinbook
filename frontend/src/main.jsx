import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Sites
import UserLogin from "./components/user/UserLogin.jsx";
import UserCreate from "./pages/Signup/UserCreate.jsx";
import UserLogout from "./components/user/UserLogout.jsx";
import Home from "./components/sites/Home.jsx";
import AllUser from "./components/sites/AllUser.jsx";
import ProfileSite from "./components/sites/ProfileSite.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    index: true,
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/alluser",
    element: <AllUser />,
  },

  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/logout",
    element: <UserLogout />,
  },

  {
    path: "/user/:userid",
    element: <ProfileSite />,
    loader({ params }) {
      return params;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
