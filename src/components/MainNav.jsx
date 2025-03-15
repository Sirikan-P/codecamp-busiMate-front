// import React from 'react'
// import { Link } from 'react-router'

// function MainNav() {
//   return (
//     <nav className="
//         bg-green-950
//         text-white
//         flex
//         justify-between
//         font-semibold
//         px-8 py-2
//         rounded-md
//         shadow
//         " >
//         <div className='flex gap-4'>
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
//         </div>

//         <div className='flex gap-4'>
//             <Link to="/register">Register</Link>
//             <Link to= "/login">Login</Link>
//         </div>
//     </nav>
//   )
// }

// export default MainNav

import React from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { userAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";

function MainNav() {
  const { authUser } = userAuthStore();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/user/login");
    localStorage.removeItem("token");
  };

  return (
    <header className="bg-base-300 border-b border-base-100 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/user"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-300 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </div>
            <h1 className="text-lg font-bold text-black">Chatty</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/user/setting"
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to="/user/profile" className="btn btn-sm gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="flex btn btn-sm gap-2 items-center"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainNav;
