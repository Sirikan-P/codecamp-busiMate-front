import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Car,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  // ถ้าใส่ในพาท แอดมิน แล้ว มี authenn แล้ว ให้เอา /admin ออกด้วยครับ
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Patients", path: "/admin/patients" },
    { icon: Car, label: "Drivers", path: "/admin/drivers" },
    { icon: FileText, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <Car className="w-8 h-8" />
        <h1 className="text-xl font-bold">Busimate</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* for a logout  function later */}
      <button className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mt-auto absolute bottom-4 w-[calc(100%-2rem)]">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
