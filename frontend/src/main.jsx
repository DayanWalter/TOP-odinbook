import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Sites
import UserLogin from "./pages/Login/UserLogin.jsx";
import UserCreate from "./pages/Signup/UserCreate.jsx";
import UserLogout from "./components/user/UserLogout.jsx";
import Home from "./components/sites/Home.jsx";
import AllUser from "./components/sites/AllUser.jsx";
import ProfileSite from "./components/sites/ProfileSite.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import AllUserPage from "./pages/AllUser/AllUserPage.jsx";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <SignupPage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // TODO:
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/alluser",
    element: <AllUserPage />,
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
