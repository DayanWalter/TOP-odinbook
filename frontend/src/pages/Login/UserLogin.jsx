// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import useLogin from "./useLogin";

export default function UserLogin() {
  // Custom hooks
  const { login, loading, error } = useLogin();

  // Hooks
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });

  // Functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleLoginDemoUser = async (e) => {
    e.preventDefault();
    login({ user_name: "DemoUser", password: "111111" });
  };

  return (
    <form onSubmit={handleLoginUser}>
      <label htmlFor="user_name">
        Username:
        <span className="text-red-500">*</span>
        <input
          className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="user_name"
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label htmlFor="user_password">
        Password:
        <span className="text-red-500">*</span>
        <input
          className="w-full px-2 py-1 mt-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
          id="user_password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        />
      </label>
      <button
        className="w-full px-4 py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M25 18c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1"
              />
              <path
                fill="currentColor"
                d="M25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1m4-23c-.2 0-.3 0-.5-.1c-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3c.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4M17 39.8c-.2 0-.3 0-.5-.1c-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3c.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4"
                opacity="0.3"
              />
              <path
                fill="currentColor"
                d="M21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3c.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3c-.2.2-.3.2-.5.2"
                opacity="0.93"
              />
              <path
                fill="currentColor"
                d="M33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3c.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3c-.2.1-.3.2-.5.2"
                opacity="0.3"
              />
              <path
                fill="currentColor"
                d="M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1"
                opacity="0.65"
              />
              <path
                fill="currentColor"
                d="M41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1"
                opacity="0.3"
              />
              <path
                fill="currentColor"
                d="M18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3c.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3c-.2.3-.5.4-.8.4"
                opacity="0.86"
              />
              <path
                fill="currentColor"
                d="M38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3c.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3c-.2.3-.5.4-.8.4"
                opacity="0.3"
              />
              <path
                fill="currentColor"
                d="M11.1 33.9c-.3 0-.6-.2-.8-.5c-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3c.3.4.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2"
                opacity="0.44"
              />
              <path
                fill="currentColor"
                d="M31.9 21.9c-.3 0-.6-.2-.8-.5c-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3c.3.4.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2"
                opacity="0.3"
              />
            </svg>
            Loading...
          </div>
        ) : (
          "Login User"
        )}
      </button>{" "}
      <button
        className="w-full px-4 py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
        onClick={handleLoginDemoUser}
        disabled={loading}
      >
        {loading ? "Please wait (30-50 seconds)" : "Demo User Login"}
      </button>
      <div className="w-2/5 py-1 mt-5 mb-5 text-center text-white rounded-sm hover:cursor-pointer bg-info hover:bg-info/80">
        <Link to={"/signup"}>or sign up</Link>
      </div>
      {/* Display error from backend */}
      <ul>
        {error &&
          error.map((err, index) => (
            <li
              key={index}
              style={{ color: "red", fontSize: "1rem" }}
            >
              {" "}
              {err.msg}
            </li>
          ))}
      </ul>
    </form>
  );
}
