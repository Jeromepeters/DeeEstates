import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user.user);
  console.log("Current User: ", currentUser);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className=" flex text-white p-3 justify-around items-center max-w-6xl mx-auto">
        <Link to={"/"}>
          <h1 className="font-bold flex flex-wrap text-sm sm:text-xl">
            <span className="text-slate-500">Dee</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            className=" bg-transparent focus:outline-none text-slate-700 "
            placeholder="Searching..."
          />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4">
          <Link
            to={"/"}
            className="hidden sm:inline text-slate-700 hover:underline"
          >
            <li>Home</li>
          </Link>
          <Link to={"/about"} className=" text-slate-700 hover:underline">
            <li>About</li>
          </Link>

          <Link
            className="hidden sm:inline  text-slate-700 hover:underline"
            to="/profile"
          >
            {currentUser ? (
              <img
                src={currentUser.avater}
                alt="profile"
                className="rounded-full h-9 w-9 object-cover"
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
