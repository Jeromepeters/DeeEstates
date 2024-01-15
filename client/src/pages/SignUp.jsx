import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import axios from "axios";
import OAuth from "../components/OAuth.jsx";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Success:", result);
      if (result.success === false) {
        setError(result.message);
      } else {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      // setError(true);
      console.error("Error:", error);
    }
  };

  console.log(formData);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-minibold text-center my-7 ">SignUp</h1>
      <form className="flex flex-col text-center    gap-4 ">
        <input
          type="text"
          className="p-3 border rounded-lg shadow-md"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="p-3 border rounded-lg shadow-md"
          placeholder="email"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          className="p-3 border rounded-lg shadow-md"
          placeholder="password"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 disabled:opacity"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div>
        <div className="flex mt-5 gap-2">
          <p>already have an account?</p>
          <Link to={"/sign-in"}>
            {" "}
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
        {error ? <p>{error}</p> : <p>i</p>}
      </div>
    </div>
  );
}
export default SignUp;
