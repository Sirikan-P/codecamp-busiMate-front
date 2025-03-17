import React from "react";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";

const DriverHistory = () => {
  const trips = [
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      patient: "Sarah Johnson",
      pickup: "123 Main St",
      dropoff: "City Hospital",
      amount: 45.0,
      status: "completed",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Trip History</h1>
        <div className="flex gap-2">
          <button className="bg-white/10 px-4 py-2 rounded-full text-sm">
            Today
          </button>
          <button className="bg-white/10 px-4 py-2 rounded-full text-sm">
            This Week
          </button>
          <button className="bg-white/10 px-4 py-2 rounded-full text-sm">
            This Month
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((trip) => (
          <div
            key={trip}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <img
                  src={`https://images.unsplash.com/photo-${
                    1500000000000 + trip
                  }?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt="Patient"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">Patient Name</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Mar {trip}, 2024</span>
                  </div>
                </div>
              </div>
              <span className="flex items-center text-lg font-semibold text-green-600">
                <DollarSign className="w-5 h-5" />
                45.00
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <span>123 Main Street, City</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span>City Hospital, Medical Center</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>30 mins</span>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverHistory;
