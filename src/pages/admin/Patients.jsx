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
  Calendar,
  CheckCircle,
  XCircle,
  User,
  BadgeCheck,
} from "lucide-react";

const mockPatients = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    age: 34,
    gender: "FEMALE",
    phoneNumber: "+1 234 567 890",
    healthCondition: "Regular checkup",
    trips: 12,
    status: "ACTIVE",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    age: 42,
    gender: "MALE",
    phoneNumber: "+1 345 678 901",
    healthCondition: "Diabetes",
    trips: 8,
    status: "INACTIVE",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Smith",
    age: 29,
    gender: "FEMALE",
    phoneNumber: "+1 456 789 012",
    healthCondition: "Hypertension",
    trips: 15,
    status: "ACTIVE",
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
      // Example for DELETE API:
      // await axios.delete(`/api/patients/${id}`);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      Swal.fire("Deleted!", "Patient has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete patient", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients Management</h1>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Patient
        </button> */}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow">
        {/* <div className="p-4 border-b flex items-center justify-between gap-4">
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
        </div> */}

        {/* Patient list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {patient.status === "ACTIVE" ? (
                      <>
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Online</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">Offline</span>
                      </>
                    )}
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

              {/* Details Section */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>
                    Age: {patient.age} ({patient.gender})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phoneNumber}</span>
                </div>
                {patient.healthCondition && (
                  <div className="flex items-center gap-2 text-sm bg-yellow-50 text-yellow-800 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <span>{patient.healthCondition}</span>
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