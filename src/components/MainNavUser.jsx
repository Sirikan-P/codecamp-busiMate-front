import { Car, Home,  MessageCircleMore, NotebookText, PencilLine,  } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function MainNavUser() {
  return (
          <nav className=" w-full h-full shadow-lg ">
              <div className="grid grid-cols-4 place-items-center pt-8 pb-8"> 
                <Link href="#" className="text-cyan-600 hover:text-blue-500">
                  <Home />
                </Link>
                <Link href="#" className="text-cyan-600 hover:text-blue-500">
                <NotebookText />
                </Link>
                <Link href="#" className="text-cyan-600 hover:text-blue-500">
                <MessageCircleMore />
                </Link>
                <Link href="#" className="text-cyan-600 hover:text-blue-500">
                <PencilLine />
                </Link>
            </div>
          </nav>
    // <nav
    //   className="
    //     bg-green-950 
    //     text-white
    //     flex
    //     justify-between
    //     font-semibold
    //     px-8 py-2
    //     rounded-md
    //     shadow
    //     "
    // >
    //   <div className="flex gap-4">
    //     <Link to="/">Home</Link>
    //     <Link to="/about">About</Link>
    //   </div>

    //   <div className="flex gap-4">
    //     <Link to="/register">Register</Link>
    //     <Link to="/login">Login</Link>
    //   </div>
    // </nav>
  );
}

export default MainNavUser;
