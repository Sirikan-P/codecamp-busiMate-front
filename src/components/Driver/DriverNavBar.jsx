import React from "react";
import { NavLink } from "react-router";
import { User, DollarSign, Clock, MessageSquare } from "lucide-react";

const DriverNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-[430px] mx-auto">
      <div className="flex justify-around items-center p-3">
        <NavLink
          to="/driver"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </NavLink>
        <NavLink
          to="/driver/earnings"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <DollarSign className="w-6 h-6" />
          <span className="text-xs">Earnings</span>
        </NavLink>
        <NavLink
          to="/driver/history"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Clock className="w-6 h-6" />
          <span className="text-xs">History</span>
        </NavLink>
        <NavLink
          to="/driver/chat"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs">Chat</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default DriverNavbar;
