import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Search,
  Filter,
  MoreVertical,
  Star,
  Phone,
  Mail,
  Car,
  Pencil,
  Trash2,
} from "lucide-react";

const mockDrivers = [
  {
    id: "1",
    name: "John Smith",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    phone: "+1 234 567 890",
    email: "john.smith@example.com",
    rating: 4.8,
    status: "active",
    totalTrips: 156,
    vehicleInfo: {
      model: "Toyota Camry",
      plate: "ABC 123",
      type: "Sedan",
    },
  },
  {
    id: "2",
    name: "Jane Doe",
    photo:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=256&h=256&q=80",
    phone: "+1 345 678 901",
    email: "jane.doe@example.com",
    rating: 4.7,
    status: "active",
    totalTrips: 132,
    vehicleInfo: {
      model: "Honda Accord",
      plate: "XYZ 456",
      type: "Sedan",
    },
  },
  {
    id: "3",
    name: "Michael Johnson",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&h=256&q=80",
    phone: "+1 456 789 012",
    email: "michael.j@example.com",
    rating: 4.9,
    status: "active",
    totalTrips: 189,
    vehicleInfo: {
      model: "Ford Focus",
      plate: "LMN 789",
      type: "Hatchback",
    },
  },
];

const Drivers = () => {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [menuOpen, setMenuOpen] = useState(null);

  // Handle delete
  const handleDeleteDriver = async (id) => {
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
      // const res = await axios(...../drivers/${id}`, {

      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error("Failed to delete driver:", error);
      alert("Failed to delete driver. Please try again.");
    }
  };

  // Handle edit
  const handleEditDriver = (driver) => {
    console.log("Edit driver:", driver);
    // Future code to open a modal or navigate to edit page
  };

  // Handle filter (to be implemented later)
  const handleFilterDriver = () => {
    console.log("Filter drivers");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Drivers Management</h1>
        <button
          onClick={() => console.log("Add new driver")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Driver
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search drivers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleFilterDriver}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Driver List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{driver.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{driver.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{driver.totalTrips} trips</span>
                    </div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === driver.id ? null : driver.id)
                    }
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {menuOpen === driver.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-lg z-10">
                      <button
                        onClick={() => handleEditDriver(driver)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDriver(driver.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{driver.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <Car className="w-4 h-4" />
                  <span>
                    {driver.vehicleInfo.model} • {driver.vehicleInfo.plate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
