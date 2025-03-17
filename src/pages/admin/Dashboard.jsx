import React from "react";
import {
  Users,
  Car,
  AlertTriangle,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", trips: 12 },
  { name: "Tue", trips: 19 },
  { name: "Wed", trips: 15 },
  { name: "Thu", trips: 22 },
  { name: "Fri", trips: 25 },
  { name: "Sat", trips: 18 },
  { name: "Sun", trips: 15 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value="1,234"
          icon={Users}
          trend="+12%"
          color="blue"
        />
        <StatCard
          title="Active Drivers"
          value="85"
          icon={Car}
          trend="+5%"
          color="green"
        />
        <StatCard
          title="Pending Trips"
          value="18"
          icon={Clock}
          trend="-2%"
          color="yellow"
        />
        <StatCard
          title="Average Rating"
          value="4.8"
          icon={Star}
          trend="+0.2"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weekly Trips Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Car className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New trip request from John Doe
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top Performing Drivers</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1500000000000 + i
                    }?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt="Driver"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Driver Name {i}</p>
                    <p className="text-sm text-gray-500">
                      {20 + i} trips this week
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{4.5 + i / 10}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">System Alerts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Driver #{i} reported an issue
                  </p>
                  <p className="text-xs text-red-600">10 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span
          className={`text-sm font-medium ${
            trend.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
};

export default Dashboard;
