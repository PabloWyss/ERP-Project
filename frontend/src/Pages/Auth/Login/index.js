import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/Logos/logo_white.svg";

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Perform sign-in logic here
    navigate("/items"); // Navigate to dashboard after successful sign-in
  };

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-screen p-8 bg-bgLogin">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Invenflow Logo" className="w-2/3 mb-2" />
          <p className="font-semibold text-4xl text-white">Invenflow</p>
          <p className="opacity-60">Slogan?</p>
        </div>
      </div>
          <div className="flex flex-col items-center justify-center w-1/2 bg-bgLogin">
            <p className="font-semibold text-2xl text-white">Log in to your Account</p>
            <p className="opacity-60">Welcome back!</p>
            <form className="w-full max-w-sm p-8" onSubmit={handleSignIn}>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:border-blue-500"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 text-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="font-medium">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
          <p className="mt-4 text-center opacity-60">
            Don't have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
            </form>
          </div>
      <div className="flex items-end justify-center h-screen w-1/2 bg-bgLogin">
        {/* Additional content on the right side */}
      </div>
    </div>
  );
}

export default Login;

