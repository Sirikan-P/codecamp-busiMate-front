import React, { useState } from "react";
import { useNavigate } from "react-router";
import ElderIllus from  "../assets/elder05.png";  

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()




  // function for user register
  const actionLinktoRegister = () => {
    navigate("/register");
  };
  
  // function for driver register
  const actionLinktoDriverRegister = () => {
    navigate("/registerdriver");
  };

  return (
    <div className=" bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center w-full">
      <div className="w-full bg-white shadow-lg overflow-hidden">
      

          {/* Illustration Container */}
          <div className="flex flex-col justify-center ">
            <div className="text-[30px] text-center text-cyan-600 pt-10">Sign In</div>
            <div className="flex justify-center pt-10">
              <img
                src={ElderIllus}
                alt="Healthcare Illustration"
                className="w-[400px] "
              />
            </div>
          </div>

          {/* Sign In Form */}
          <form className="bg-cyan-50 space-y-6 h-[600px] pt-20 p-15 rounded-t-[60px]">
{/* Email Input */}
            <div >
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
{/* password Input */}
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
{/* Forget  password*/}
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
{/* USER Register */}
          <div className="w-full flex justify-center">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?
              <span onClick={actionLinktoRegister} className="text-cyan-500 hover:text-cyan-600 font-medium pl-2">
                Register
              </span>
            </div>
            </div>
{/* Driver Register */}
            <div className="text-center text-sm text-gray-500">
              <div
              onClick={actionLinktoDriverRegister}
                className="text-cyan-500 hover:text-cyan-600 font-medium"
              >
                Become our Driver
              </div>
            </div>
          </form>
       
      </div>
    </div>
  );
}

export default Login;
