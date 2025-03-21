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
  Menu,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router";

function MainNavAdmin() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
      navigate("/admin/login");
      localStorage.removeItem("token");
    };
  return (
    <div>
      <nav className=" w-full h-full shadow-lg ">
        <div className="grid grid-cols-7 place-items-center  absolute z-10 right-1 w-full bg-white">
          <Link to="/admin" className="text-cyan-600 w-full flex justify-center items-center h-20 active:bg-rose-100">
            <div className="flex gap-2">
            <Home /> DASHBOARD
            </div>
          </Link>
          <Link to={"/admin/admingetuser"} href="#" className="text-cyan-600  w-full flex justify-center items-center h-20 active:bg-rose-100">
          <div className="flex gap-2">
          <Users /> USER
          </div>
          </Link>
          <Link to={"/admin/admingetdriver"} className="text-cyan-600 w-full flex justify-center items-center h-20 active:bg-rose-100">
          <div className="flex gap-2">
          <CarFront /> DRIVER
          </div>
          </Link>
          <Link href="#" className="text-cyan-600 w-full flex justify-center items-center h-20 active:bg-rose-100">
          <div className="flex gap-2">
          <NotebookText /> BOOKING
          </div>
          </Link>
          <Link href="#" className="text-cyan-600 w-full flex justify-center items-center h-20 active:bg-rose-100">
          <div className="flex gap-2">
          <MessageSquareWarning /> REPORTS
          </div>
          </Link>
          <Link to="/admin/profile" className="text-cyan-600 w-full flex justify-center items-center h-20"  >
                <div className="flex gap-2 ">
              <Settings className="" />Setting
                </div>
            </Link>
            <div className="text-cyan-600 w-full flex justify-center items-center h-20" onClick={logout}>
            <div className="flex gap-2 ">
              <LogOut/> Logout
              </div>
            </div>
        </div>
        
      </nav>
    </div>
  );
}

export default MainNavAdmin;
