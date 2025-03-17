import {
  Bike,
  Combine,
  Mouse as House,
  User,
  Ambulance,
  Activity,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Search,
  ChartNoAxesCombined,
  ChevronsLeftRightIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  actionGetDriverDataAll,
  actionUpdateDriverData,
} from "../../api/adminManageDriver";
import { get } from "react-hook-form";
import { Link } from "react-router";
import ListAllDriver from "../../components/admin/ListAllDriver";

function AdminGetDriver() {
  const [searchTerm, setSearchTerm] = useState("");

  // const drivers = [
  //   {
  //     id: 1,
  //     name: "William Deno",
  //     phone: "+66 666 66666",
  //     status: "Active",
  //     rating: 4.8,
  //     completedTrips: 128,
  //     image:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
  //     available: true,
  //     currentLocation: "Bangkok General Hospital",
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Chen",
  //     phone: "+66 777 77777",
  //     status: "Active",
  //     rating: 4.9,
  //     completedTrips: 256,
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
  //     available: true,
  //     currentLocation: "Sukhumvit Medical Center",
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Rodriguez",
  //     phone: "+66 888 88888",
  //     status: "On Trip",
  //     rating: 4.7,
  //     completedTrips: 184,
  //     image:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
  //     available: false,
  //     currentLocation: "En route to Siriraj Hospital",
  //   },
  // ];

  const menuItems = [
    { icon: House, label: "Dashboard", href: "#" },
    { icon: User, label: "Profile", href: "#" },
    { icon: Ambulance, label: "Drivers", href: "#", active: true },
    { icon: ChartNoAxesCombined, label: "History", href: "#" },
  ];

  const stats = [
    { label: "Active Drivers", value: "18" },
    { label: "On Trip", value: "5" },
    { label: "Completed Today", value: "42" },
  ];

  // const filteredDrivers = drivers.filter(
  //   (driver) =>
  //     driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     driver.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const [driverDataAll, setDriverDataAll] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MTg1NDQwNCwiZXhwIjoxNzQzMTUwNDA0fQ.ZFoevBdOJnZPEKmQFFuu6j-nwqUN0-U6EF_E30y5vc0";

  const hdlGetDriverDataAll = async () => {
    try {
      const result = await actionGetDriverDataAll(token);
      console.log("result.data.data ==== ", result.data.data);
      setDriverDataAll(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hdlGetDriverDataAll();
  }, []);

  console.log("driverDataAll ==== ", driverDataAll);

  const hdlUpdateDriverStatus = async (e, id) => {
    try {
      console.log("e.target.value ==== ", e.target.value);
      console.log("driver.id ==== ", id);
      const status = e.target.value;
      const driverId = id;
      const result2 = await actionUpdateDriverData(token, driverId, { status });
      console.log("result2 ==== ", result2);
      hdlGetDriverDataAll();
    } catch (error) {
      console.error("Failed to update driver status:",error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t md:relative md:border-t-0 md:border-b z-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-around items-center h-16">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center p-2 transition-colors ${
                  item.active
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6 mb-20 md:mb-0">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h1 className="text-2xl font-bold text-white mb-4">GET DRIVER</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search drivers or locations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Drivers List */}
          <div className="p-6">
            <div className="space-y-4">
              {driverDataAll.map((driverData) => (
                <ListAllDriver 
                key={driverData.id}
                driverData={driverData}
                token={token}
                hdlGetDriverDataAll={hdlGetDriverDataAll}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminGetDriver;
