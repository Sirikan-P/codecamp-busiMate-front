import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Filter, PlusCircle, X } from "lucide-react";

const tripData = [
  { month: "Jan", completed: 65, cancelled: 12 },
  { month: "Feb", completed: 75, cancelled: 8 },
  { month: "Mar", completed: 85, cancelled: 10 },
  { month: "Apr", completed: 95, cancelled: 15 },
  { month: "May", completed: 105, cancelled: 9 },
  { month: "Jun", completed: 115, cancelled: 11 },
];

const satisfactionData = [
  { name: "Very Satisfied", value: 400 },
  { name: "Satisfied", value: 300 },
  { name: "Neutral", value: 200 },
  { name: "Dissatisfied", value: 50 },
  { name: "Very Dissatisfied", value: 25 },
];

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#64748b"];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [newReport, setNewReport] = useState({
    type: "",
    status: "",
    message: "",
  });

  // Handle creating report

  const handleCreateReport = () => {
    const report = {
      id: 2025000 + reports.length + 1, // Generate unique ID
      type: newReport.type, // Report type
      date: new Date().toLocaleDateString("en-US", {
        // Current date
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: newReport.status,
      message: newReport.message,
    };

    setReports((prev) => [report, ...prev]);
    setShowCreateModal(false);
    setNewReport({ type: "", status: "", message: "" });
  };

  const editReport = (id) => {
    const report = reports.find((report) => report.id === id);
    setNewReport({
      type: report.type,
      status: report.status,
      message: report.message,
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex items-center gap-4">
          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {/* Create Report Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Report</span>
          </button>
        </div>
      </div>

      {/* Graph Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
      {/* Trip Statistics */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-6">Trip Statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tripData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  name="Completed Trips"
                  fill="#3b82f6"
                />
                <Bar
                  dataKey="cancelled"
                  name="Cancelled Trips"
                  fill="#ef4444"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

      {/* Satisfaction Pie Chart */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-6">Patient Satisfaction</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> */}

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Report ID</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="py-3">#{report.id}</td>
                  <td className="py-3">{report.type}</td>
                  <td className="py-3">{report.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Report</h2>
            <select
              value={newReport.type}
              onChange={(e) =>
                setNewReport({ ...newReport, type: e.target.value })
              }
              className="border w-full p-2 rounded mb-4"
            >
              <option value="">Select Report Type</option>
              <option value="Driver Performance">Driver Performance</option>
              <option value="Patient Feedback">Patient Feedback</option>
            </select>

            {/* Status dropdown */}
            <select
              value={newReport.status}
              onChange={(e) =>
                setNewReport({ ...newReport, status: e.target.value })
              }
              className="border w-full p-2 rounded mb-4"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>

            <textarea
              placeholder="Report Message"
              value={newReport.message}
              onChange={(e) =>
                setNewReport({ ...newReport, message: e.target.value })
              }
              className="border w-full p-2 rounded mb-4"
            />
            <button
              onClick={handleCreateReport}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;