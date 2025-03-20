import React from "react";
import { DollarSign, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", earnings: 120 },
  { day: "Tue", earnings: 150 },
  { day: "Wed", earnings: 180 },
  { day: "Thu", earnings: 140 },
  { day: "Fri", earnings: 200 },
  { day: "Sat", earnings: 220 },
  { day: "Sun", earnings: 190 },
];

const DriverEarnings = () => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-6 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold mb-6">Earnings</h1>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>Today's Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            <span className="text-3xl font-bold">185.50</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Trips</h2>
          {[1, 2, 3].map((trip) => (
            <div
              key={trip}
              className="bg-white p-4 rounded-xl shadow-sm border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Trip #{trip}</h3>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="text-lg font-semibold text-green-600">
                  $35.00
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Completed</span>
                </div>
                <button className="text-blue-600">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverEarnings;