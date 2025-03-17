import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Trash2,
} from "lucide-react";

const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 234 567 890",
    email: "sarah.j@example.com",
    address: "123 Main St, City, State",
    emergencyContact: "+1 234 567 891",
    medicalCondition: "Regular checkup",
    trips: 12,
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+1 345 678 901",
    email: "john.doe@example.com",
    address: "456 Elm St, City, State",
    emergencyContact: "+1 345 678 902",
    medicalCondition: "Diabetes",
    trips: 8,
  },
  {
    id: "3",
    name: "Jane Smith",
    phone: "+1 456 789 012",
    email: "jane.smith@example.com",
    address: "789 Oak St, City, State",
    emergencyContact: "+1 456 789 013",
    medicalCondition: "Hypertension",
    trips: 15,
  },
];

const Patients = () => {
  const [patients, setPatients] = useState(mockPatients);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      // const res = await axios(...../drivers/${id}`
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Failed to delete patient:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete patient. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Patient
        </button>
      </div>

      {/* Search and filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Patient list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>{patient.trips} total trips</span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{patient.address}</span>
                </div>
                {patient.medicalCondition && (
                  <div className="flex items-center gap-2 text-sm bg-yellow-50 text-yellow-800 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <span>{patient.medicalCondition}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
