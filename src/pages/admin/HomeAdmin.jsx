import {
  Bike,
  Combine as ChartNoAxesCombined,
  Mouse as House,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  FileText,
  Settings,
  LogOut,
  Ambulance,
} from "lucide-react";
import React from "react";

function HomeAdmin() {
  const stats = [
    { label: "Reports", value: "28" },
    { label: "Drivers", value: "12" },
    { label: "User", value: "5" },
  ];

  const menuItems = [
    { icon: House, label: "Dashboard", href: "#" },
    { icon: User, label: "Profile", href: "#", active: true },
    { icon: Ambulance, label: "Drivers", href: "#" },
    { icon: ChartNoAxesCombined, label: "History", href: "#" },
  ];

  const quickActions = [
    { icon: Edit, label: "Edit Profile" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-cyan-500 to-cyan-900">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Profile picture of Andro Strassmann"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Andro Strassmann
            </h1>
            <p className="text-gray-600 mt-1">Senior Project Manager</p>

            <div className="flex justify-center items-center gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+66 666 66666</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-cyan-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="flex items-center justify-center gap-2 p-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <action.icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;
