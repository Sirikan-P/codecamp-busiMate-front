import {
  Car,
  ClipboardPlus,
  Home,
  LogOut,
  Menu,
  MessageCircleMore,
  NotebookText,
  PencilLine,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userAuthStore } from "../store/userAuthStore";

function MainNavUser() {
  const { authUser, logout: logoutFromStore } = userAuthStore(); // Use logout from store
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    logoutFromStore(); // Call the store's logout method
    navigate("/user/login"); // Navigate after logout
  };

  const navItems = [
    { to: "/user", icon: <Home className="w-5 h-5" />, label: "Home" },
    { to: "#", icon: <NotebookText className="w-5 h-5" />, label: "Booking" },
    {
      to: "/user/chat",
      icon: <MessageCircleMore className="w-5 h-5" />,
      label: "Chat",
    },
    {
      to: "#",
      icon: <PencilLine className="w-5 h-5" />,
      label: "Create Booking",
    },
  ];

  const authItems = authUser
    ? [
        {
          to: "/user/profile",
          icon: <User className="w-5 h-5" />,
          label: "Profile",
        },
        {
          to: null,
          icon: <LogOut className="w-5 h-5" />,
          label: "Logout",
          onClick: logout,
        },
      ]
    : [];

  return (
    <nav className="w-full shadow-lg bg-white">
      {/* Mobile Toggle Button */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <Link to="/user" className="text-cyan-600 font-bold text-lg">
          Busimate
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cyan-600 hover:text-cyan-500 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      { isOpen && 
      <div className="grid grid-rows-6  shadow-2xl place-items-start gap-2 absolute z-10 right-1 w-[200px] bg-white pt-5 pb-5">
        <Link to='/user' className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100 ">
          <Home /> Home
        </Link>
        <Link to='/user/booking' className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
          <NotebookText /> Booking
        </Link>
        <Link href="#" className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
          <MessageCircleMore /> Chat
        </Link>
        <Link to='/user/booking/create' className="text-cyan-600  pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
          <PencilLine /> Create Booking
        </Link>
        <Link to="/user/patients" className="text-cyan-600  pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100">
              <ClipboardPlus />Patients
        </Link>
        {authUser && (
          <>
            <Link
              to="/user/setting"
              className="text-cyan-600 pl-2 pb-2 inline-flex gap-2 w-full active:bg-rose-100"
            >
              <User className="w-5 h-5" />Edit Profile
            </Link>
          ))}
          {authItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-500 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-500 transition-colors cursor-pointer"
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNavUser;
