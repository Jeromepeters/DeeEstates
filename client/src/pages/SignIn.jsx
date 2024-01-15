import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../reducer/features/users/userSlice";
import OAuth from "../components/OAuth";
// import SignIn from "./SignIn.jsx";
// import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Success:", result);
      if (result.success === false) {
        dispatch(signInFailure(result.message));
      } else {
        dispatch(signInSuccess(result));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Error:", error);
    }
  };

  console.log(formData);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-minibold text-center my-7 ">Sign In</h1>
      <form className="flex flex-col text-center    gap-4 ">
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
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 disabled:opacity-80"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div>
        <div className="flex mt-5 gap-2">
          <p>create an account</p>
          <Link to={"/sign-up"}>
            {" "}
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        {error ? <p>{error}</p> : <p>i</p>}
      </div>
    </div>
  );
}
export default SignIn;
