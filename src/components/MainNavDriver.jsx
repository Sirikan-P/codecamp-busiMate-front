import {
  Car,
  Home,
  NotebookText,
  MessageCircleMore,
  MapPinHouse,
  Menu,
  PencilLine,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { driverAuthStore } from "../store/driverAuthStore";
import { useNavigate } from "react-router";

function MainNavDriver() {
  const [isOpen, setIsOpen] = useState(false);
  const { authDriver } = driverAuthStore();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/driver/login");
    localStorage.removeItem("token");
  };

  return (
    <nav className=" w-full h-full shadow-lg ">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="text-cyan-600 hover:text-blue-500  flex justify-end p-5"
      >
        <Menu className="w-[30px] h-[30px]≈" />
      </div>

      {isOpen && (
        <div className="grid grid-rows-6  shadow-2xl place-items-start gap-2 absolute z-10 right-1 w-[200px] bg-white pt-5 pb-5">
          <Link
            to="/driver"
            className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100 "
          >
            <Home /> Home
          </Link>
          <Link className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
            <NotebookText /> Booking
          </Link>
          <Link className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
            <MessageCircleMore /> Chat
          </Link>
          <Link className="text-cyan-600  pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
            <PencilLine /> Create Booking
          </Link>
          <Link
            to="/driver/setting"
            className="text-cyan-600  pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100"
          >
            <Settings />
            Settings
          </Link>
          {authDriver && (
            <>
              <Link
                to="/driver/profile"
                className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100"
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
              <div
                className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" /> Logout
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default MainNavDriver;
