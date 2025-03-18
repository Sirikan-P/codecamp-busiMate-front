import React from "react";
import { Users, Car, AlertTriangle, Clock, Star } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockStats = {
  totalPatients: 1200,
  activeDrivers: 85,
  pendingTrips: 18,
  averageRating: 4.8,
};

const mockWeeklyTrips = [
  { day: "Mon", trips: 12 },
  { day: "Tue", trips: 19 },
  { day: "Wed", trips: 15 },
  { day: "Thu", trips: 22 },
  { day: "Fri", trips: 25 },
  { day: "Sat", trips: 18 },
  { day: "Sun", trips: 15 },
];

const mockTopDrivers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    profileImage: "https://i.pravatar.cc/100?img=1",
    completedTrips: 25,
    rating: 4.9,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    profileImage: "https://i.pravatar.cc/100?img=2",
    completedTrips: 20,
    rating: 4.7,
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    profileImage: "https://i.pravatar.cc/100?img=3",
    completedTrips: 22,
    rating: 4.8,
  },
];

const mockRecentActivities = [
  { id: 1, patientName: "John Doe", timeAgo: "2 minutes ago" },
  { id: 2, patientName: "Jane Smith", timeAgo: "5 minutes ago" },
  { id: 3, patientName: "Michael Johnson", timeAgo: "10 minutes ago" },
];

const mockAlerts = [
  { id: 1, message: "Driver #1 reported an issue", timeAgo: "10 minutes ago" },
  {
    id: 2,
    message: "Payment issue with Booking #234",
    timeAgo: "30 minutes ago",
  },
  { id: 3, message: "Driver #5 reported late arrival", timeAgo: "1 hour ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={mockStats.totalPatients}
          icon={Users}
          trend="+12%"
          color="blue"
        />
        <StatCard
          title="Active Drivers"
          value={mockStats.activeDrivers}
          icon={Car}
          trend="+5%"
          color="green"
        />
        <StatCard
          title="Pending Trips"
          value={mockStats.pendingTrips}
          icon={Clock}
          trend="-2%"
          color="yellow"
        />
        <StatCard
          title="Average Rating"
          value={mockStats.averageRating.toFixed(1)}
          icon={Star}
          trend="+0.2"
          color="purple"
        />
      </div>
      {/* Weekly Overview and Recent Activities */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
      {/* Weekly Trips Overview */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weekly Trips Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeeklyTrips}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="trips"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> */}
      {/* Recent Activities */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Car className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New trip request from {activity.patientName}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Top Performing Drivers and System Alerts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
      {/* Top Performing Drivers */}
      {/* <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top Performing Drivers</h2>
          <div className="space-y-4">
            {mockTopDrivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={driver.profileImage}
                    alt={driver.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">
                      {driver.firstName} {driver.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {driver.completedTrips} trips this week
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">
                    {driver.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      {/* System Alerts */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">System Alerts</h2>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {alert.message}
                  </p>
                  <p className="text-xs text-red-600">{alert.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <Icon className={`w-6 h-6 text-${color}-600`} />
        <span className={`text-sm font-medium`}>{trend}</span>
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
};

export default Dashboard;
