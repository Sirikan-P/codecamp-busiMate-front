import {
  Home,
  NotebookText,
  MessageCircleMore,
  Menu,
  PencilLine,
  User,
  LogOut,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { driverAuthStore } from "../store/driverAuthStore";

function MainNavDriver() {
  const { authDriver, logout: logoutFromStore } = driverAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    logoutFromStore();
    navigate("/driver/login");
  };

  const navItems = [
    { to: "/driver", icon: <Home className="w-5 h-5" />, label: "Home" },
    { to: "#", icon: <NotebookText className="w-5 h-5" />, label: "Booking" },
    {
      to: "/driver/chat",
      icon: <MessageCircleMore className="w-5 h-5" />,
      label: "Chat",
    },
    {
      to: "#",
      icon: <PencilLine className="w-5 h-5" />,
      label: "Create Booking",
    },
  ];

  const authItems = authDriver
    ? [
        {
          to: "/driver/profile",
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
        <Link to="/driver" className="text-cyan-600 font-bold text-lg">
          Busimate
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cyan-600 hover:text-cyan-500 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-0 w-64 bg-white shadow-2xl rounded-lg z-10 p-4 transition-all duration-300 ease-in-out">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-2 text-cyan-600 hover:bg-cyan-50 active:bg-rose-100 p-2 rounded-md w-full"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          {authItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 text-cyan-600 hover:bg-cyan-50 active:bg-rose-100 p-2 rounded-md w-full"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="flex items-center gap-2 text-cyan-600 hover:bg-cyan-50 active:bg-rose-100 p-2 rounded-md w-full cursor-pointer"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </div>
            )
          )}
        </div>
      )}

      {/* Desktop Horizontal Menu */}
      <div className="hidden md:flex justify-between items-center p-4 max-w-7xl mx-auto">
        <Link to="/driver" className="text-cyan-600 font-bold text-lg">
          Busimate
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-500 transition-colors"
            >
              {item.icon}
              {item.label}
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

export default MainNavDriver;
