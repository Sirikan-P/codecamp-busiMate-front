import React, { useState } from "react";
import { Link } from "react-router";
import {
  CarFront,
  Home,
  NotebookText,
  MessageCircleMore,
  MapPinHouse,
  Users,
  MessageSquareWarning,
  Menu
} from "lucide-react";

function MainNavAdmin() {

    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen);

  return (
    <div>
      <nav className=" w-full h-full shadow-lg ">
        <div onClick={()=>{
            setIsOpen(!isOpen)
        }} className="text-cyan-600 hover:text-blue-500  flex justify-end p-5">
        <Menu className="w-[30px] h-[30px]≈" />
        </div>
        { isOpen &&
        <div className="grid grid-rows-5  p-5 gap-5 absolute z-10 right-1 w-[200px] bg-white">
          <Link href="#" className="text-cyan-600 hover:text-blue-500 ">
            <div className="flex gap-2">
            <Home /> DASHBOARD
            </div>
          </Link>
          <Link href="#" className="text-cyan-600 hover:text-blue-500">
          <div className="flex gap-2">
          <Users /> USER
          </div>
          </Link>
          <Link href="#" className="text-cyan-600 hover:text-blue-500">
          <div className="flex gap-2">
          <CarFront /> DRIVER
          </div>
          </Link>
          <Link href="#" className="text-cyan-600 hover:text-blue-500">
          <div className="flex gap-2">
          <NotebookText /> BOOKING
          </div>
          </Link>
          <Link href="#" className="text-cyan-600 hover:text-blue-500">
          <div className="flex gap-2">
          <MessageSquareWarning /> REPORTS
          </div>
          </Link>
        </div>
        }
      </nav>
    </div>
  );
}

export default MainNavAdmin;
