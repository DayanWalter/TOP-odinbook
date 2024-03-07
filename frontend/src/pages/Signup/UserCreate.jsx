// Signup
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "./useSignup";

export default function UserCreate() {
  const { signup, loading, error } = useSignup();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit Form
  const handleCreateUser = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="user_name" className="w-full mb-5">
          Username:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="user_name"
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required={true}
          />
        </label>

        <label htmlFor="email" className="w-full mb-5 ">
          Email:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="true"
            required={true}
          />
        </label>

        <label htmlFor="password" className="w-full mb-5">
          Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
        </label>

        <label htmlFor="repeatPassword" className="w-full mb-5">
          Repeat Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required={true}
          />
        </label>

        <button
          className="w-full py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
          type="submit"
          disabled={loading}
        >
          {loading ? `Creating User: ${formData.user_name}` : "Signup"}
        </button>
        <div className="w-2/5 py-1 mt-5 mb-5 text-center text-white rounded-sm hover:cursor-pointer bg-info hover:bg-info/80">
          <Link to={"/login"}>or login</Link>
        </div>
      </form>

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
    </>
  );
}
