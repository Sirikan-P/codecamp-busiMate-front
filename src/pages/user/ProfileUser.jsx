import React from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Home,
  Plus,
  User,
  Calendar,
  ChevronRight,
  ClipboardList,
  Heart,
  Settings,
} from "lucide-react";

const ProfileUser = () => {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate("/profile-edit-user");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-600 text-sm">Hello,</p>
              <p className="text-lg font-semibold">Somchai</p>
            </div>
          </div>
          {/* ใส่ปุ่มไไ้วกดเฉแยๆ */}
          <div className="relative flex items-center gap-4">
            <button
              className="text-blue-500 text-sm"
              onClick={handleEditProfile}
            >
              Edit
            </button>
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              1
            </span>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold mb-1">My Booking</h2>
              <p className="text-gray-600 text-sm">Friday, 14 March 2025</p>
              <p className="text-gray-600 text-sm">09:00 AM</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
          <button className="mt-4 text-blue-600 text-sm">See More</button>
        </div>

        {/* Feature Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Appointment Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-sm font-semibold">Appointment</h3>
                <p className="text-xs text-gray-500">
                  Manage your appointments
                </p>
              </div>
            </div>
          </div>

          {/* Health Record Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-sm font-semibold">Health Records</h3>
                <p className="text-xs text-gray-500">
                  View and update health data
                </p>
              </div>
            </div>
            <button className="text-green-500 text-sm">View</button>
          </div>

          {/* Favorites Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-sm font-semibold">Favorites</h3>
                <p className="text-xs text-gray-500">
                  Manage your favorite doctors
                </p>
              </div>
            </div>
            <button className="text-red-500 text-sm">Manage</button>
          </div>

          {/* Settings Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-gray-500" />
              <div>
                <h3 className="text-sm font-semibold">Settings</h3>
                <p className="text-xs text-gray-500">Account preferences</p>
              </div>
            </div>
            <button className="text-gray-500 text-sm">Open</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;