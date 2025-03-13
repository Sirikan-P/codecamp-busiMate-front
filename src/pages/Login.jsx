import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg overflow-hidden">
        <div className="pt-12">
          <h1 className="text-3xl font-semibold text-center text-cyan-500 mb-6">
            Sign In
          </h1>

          {/* Illustration Container */}
          <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <img
                src="#"
                alt="Healthcare Illustration"
                className="w-40 h-40 object-cover"
              />
            </div>
          </div>

          {/* Sign In Form */}
          <form className="bg-cyan-50 space-y-6 px-8 pb-24 pt-12 rounded-t-4xl">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-500 hover:text-cyan-600">
                Forgot Password?
              </a>
            </div>

            <div className=" flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-cyan-500 text-white py-3 rounded-4xl hover:bg-cyan-600 transition duration-200 font-medium"
              >
                Sign In
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-cyan-500 hover:text-cyan-600 font-medium"
              >
                Register
              </a>
            </div>
            <div className="text-center text-sm text-gray-500">
              <a
                href="/register-driver"
                className="text-cyan-500 hover:text-cyan-600 font-medium"
              >
                Become our Driver
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
