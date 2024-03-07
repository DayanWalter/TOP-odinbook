import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";

export default function UserLogin() {
  const { login, loading, error } = useLogin();

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });

  // Change userData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // User Login
  const handleLoginUser = async (e) => {
    e.preventDefault();
    login(formData);
  };

  // Demo User Login
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
        {loading ? `Loggin in ${formData.user_name}` : "Login User"}
      </button>{" "}
      <button
        className="w-full px-4 py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
        onClick={handleLoginDemoUser}
        disabled={loading}
      >
        Demo User Login
      </button>
      <div className="w-2/5 py-1 mt-5 mb-5 text-center text-white rounded-sm hover:cursor-pointer bg-info hover:bg-info/80">
        <Link to={"/signup"}>or sign up</Link>
      </div>
      {/* Display error from backend */}
      <ul>
        {error &&
          error.map((err, index) => (
            <li key={index} style={{ color: "red", fontSize: "1rem" }}>
              {" "}
              {err.msg}
            </li>
          ))}
      </ul>
    </form>
  );
}
