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
  CheckCircle,
  XCircle,
  Wallet,
  User,
} from "lucide-react";

const mockDrivers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    age: 34,
    gender: "MALE",
    phoneNumber: "+1 234 567 890",
    email: "john.smith@example.com",
    rating: 4.8,
    status: "ACTIVE",
    online: "ONLINE",
    totalTrips: 156,
    walletBalance: 1200.5,
    vehicleInfo: {
      model: "Toyota Camry",
      plate: "ABC 123",
      type: "SEETS_4",
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    age: 29,
    gender: "FEMALE",
    phoneNumber: "+1 345 678 901",
    email: "jane.doe@example.com",
    rating: 4.7,
    status: "ACTIVE",
    online: "OFFLINE",
    totalTrips: 132,
    walletBalance: 800.0,
    vehicleInfo: {
      model: "Honda Accord",
      plate: "XYZ 456",
      type: "SEETS_4",
    },
  },
];

const Drivers = () => {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [menuOpen, setMenuOpen] = useState(null);

  // Handle delete driver
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
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
      Swal.fire("Deleted!", "Driver has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete driver", "error");
    }
  };

  // Handle edit driver
  const handleEditDriver = (driver) => {
    console.log("Edit driver:", driver);
    // Example: Open modal for editing or navigate to edit page
  };

  // Handle filter driver
  const handleFilterDriver = () => {
    console.log("Filter drivers");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Drivers Management</h1>
        {/* <button
          onClick={() => console.log("Add new driver")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Driver
        </button> */}
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
                <div>
                  <h3 className="font-medium">
                    {driver.firstName} {driver.lastName}
                  </h3>
                  {/* <div className="flex items-center gap-1 text-sm text-gray-500"> */}
                  {/* Average Rating */}
                  {/* {driver.reviews?.length > 0 ? (
                      <>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>
                          {(
                            driver.reviews.reduce(
                              (sum, review) => sum + review.rate,
                              0
                            ) / driver.reviews.length
                          ).toFixed(1)}{" "}
                          stars
                        </span>
                        <span className="mx-2">•</span>
                      </>
                    ) : (
                      <span>No rating</span>
                    )} */}

                  {/* Completed Trips */}
                  {/* <span>
                      {driver.bookings?.filter(
                        (booking) => booking.bookingStatus === "COMPLETE"
                      ).length || 0}{" "}
                      completed trips
                    </span>
                  </div> */}
                </div>

                {/* Driver status */}
                {driver.online === "ONLINE" ? (
                  <>
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span> Online</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-red-500">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>Offline</span>
                    </div>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>
                      Age: {driver.age} ({driver.gender})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{driver.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Car className="w-4 h-4" />
                    <span>
                      {driver.vehicleInfo.model} ({driver.vehicleInfo.plate})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Wallet className="w-4 h-4" />
                  <span>${driver.walletBalance}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                {/* <button
                  onClick={() => handleEditDriver(driver)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDeleteDriver(driver.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drivers;