import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Edit,
  Star,
  Award,
  Shield,
  Clock,
} from "lucide-react";

function MockDriverHome() {
  const [activeTab, setActiveTab] = useState("wallet");

  const mockDrivevData = [
    {
      id: 3,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T08:27:47.718Z",
      description: "Completed Ride #A123",
    },
    {
      id: 2,
      type: "OUTCOME",
      amount: 50,
      date: "2025-03-13T05:41:25.689Z",
      description: "Platform Fee",
    },
    {
      id: 1,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T05:38:35.767Z",
      description: "Completed Ride #A122",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-radial from-base-300 via-base-100 to-base-300">
      {/* Profile Section */}
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="avatar online">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                      alt="Profile"
                    />
                  </div>
                </div>
                <button className="btn btn-circle btn-sm btn-primary absolute bottom-0 right-0 shadow-lg hover:scale-105 transition-transform">
                  <Edit size={14} />
                </button>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">Driver1 Lastname1</h2>
                </div>
                <div className="mt-3 text-sm opacity-75">
                  <p>Phone: 0810010001</p>
                  <p>Male</p>
                  <p>Age: 26</p>
                  <p>Location: Bangkok 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl">
          <h2 className="card-title flex items-center gap-2">
            <Wallet className="text-primary" />
            Driver Wallet
          </h2>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="stat">
                  <div>
                    <div className="stat-title">Current Balance</div>
                    <div className="stat-value text-success">฿ 150</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              {mockDrivevData.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-base-200 p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          entry.type === "INCOME"
                            ? "bg-success/20 text-success"
                            : "bg-error/20 text-error"
                        }`}
                      >
                        {entry.type === "INCOME" ? (
                          <TrendingUp size={20} />
                        ) : (
                          <TrendingDown size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          ID: {entry.id} - {entry.description}
                        </p>
                        <p className="text-sm opacity-70">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        entry.type === "INCOME" ? "text-success" : "text-error"
                      }`}
                    >
                      {entry.type === "INCOME" ? "+" : "-"}฿{entry.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockDriverHome;
