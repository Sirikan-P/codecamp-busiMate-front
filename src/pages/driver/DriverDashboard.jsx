import React from "react";
import { Phone, ChevronRight } from "lucide-react";

function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Profile Section */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">Andro Strassinaim</h2>
                <p className="text-gray-600">+66 666 66666</p>
                <p className="text-gray-600">Bkk, Thailand</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Edit</button>
          </div>
        </div>

        {/* Address Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium mb-4">Address</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <p className="text-gray-600">
                123/45 Main Street, Los Angeles, CA, USA
              </p>
              <div className="flex justify-between mt-2">
                <span>Los Angeles</span>
                <span>90001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">WALLET</h3>
          <div className="text-3xl font-bold mb-6">$898</div>

          {/* Time Period Stats */}
          <div className="space-y-4">
            {[
              { period: "TODAY", amount: "$898", percentage: "53%" },
              { period: "7 DAYS", amount: "$12300", percentage: "34%" },
              { period: "30 DAYS", amount: "$22300", percentage: "34%" },
              { period: "3 MONTHS", amount: "$32300", percentage: "34%" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <div
                      className="w-8 h-8 rounded-full border-4 border-blue-500"
                      style={{
                        background: `conic-gradient(#3B82F6 ${item.percentage}, transparent ${item.percentage})`,
                      }}
                    />
                  </div>
                  <span className="font-medium">{item.period}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{item.amount}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
