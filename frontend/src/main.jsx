// React
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// CSS
import "./assets/index.css";

// Pages
import SignupPage from "./pages/Signup/SignupPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import AllUserPage from "./pages/AllUser/AllUserPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import LogoutPage from "./pages/Logout/LogoutPage.jsx";

// Router
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
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/alluser",
    element: <AllUserPage />,
  },
  // TODO:
  {
    path: "/user/:userid",
    element: <ProfilePage />,
    loader({ params }) {
      return params;
    },
  },

  {
    path: "/logout",
    element: <LogoutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
