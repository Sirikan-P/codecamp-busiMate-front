import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Home,
  Plus,
  User,
  Calendar,
  ChevronRight,
  ClipboardList,
  Heart,
  Settings,
  MapPin,
} from "lucide-react";

const ProfileUser = () => {
  const navigate = useNavigate();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    address: "",
    isDefault: false,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Bangkok 10330",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Office Tower, Silom Road, Bangkok 10500",
      isDefault: false,
    },
  ]);

  const handleEditProfile = () => {
    navigate("/profile-edit-user");
  };

  const handleAddAddress = () => {
    setShowAddAddress(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    const newId = addresses.length + 1;

    const updatedAddresses = newAddress.isDefault
      ? addresses.map((a) => ({ ...a, isDefault: false })) // Unmark other addresses if setting as default
      : [...addresses];

    const newAddressData = {
      id: newId,
      type: newAddress.type,
      address: newAddress.address,
      isDefault: newAddress.isDefault,
    };

    setAddresses([...updatedAddresses, newAddressData]);
    setShowAddAddress(false);
    setNewAddress({ type: "Home", address: "", isDefault: false });
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === id
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-600 text-sm">Hello,</p>
              <p className="text-lg font-semibold">Somchai</p>
            </div>
          </div>
          <div className="relative flex items-center gap-4">
            <button
              className="text-blue-500 text-sm"
              onClick={handleEditProfile}
            >
              Edit
            </button>
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              1
            </span>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold mb-1">My Booking</h2>
              <p className="text-gray-600 text-sm">Friday, 14 March 2025</p>
              <p className="text-gray-600 text-sm">09:00 AM</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
          <button className="mt-4 text-blue-600 text-sm">See More</button>
        </div>

        {/* Appointment Section */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-sm font-semibold">Appointment</h3>
                <p className="text-xs text-gray-500">
                  Manage your appointments
                </p>
              </div>
            </div>
          </div>

          {/* Health Record Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-sm font-semibold">Health Records</h3>
                <p className="text-xs text-gray-500">
                  View and update health data
                </p>
              </div>
            </div>
            <button className="text-green-500 text-sm">View</button>
          </div>

          {/* Favorites Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-sm font-semibold">Favorites</h3>
                <p className="text-xs text-gray-500">
                  Manage your favorite doctors
                </p>
              </div>
            </div>
            <button className="text-red-500 text-sm">Manage</button>
          </div>

          {/* Settings Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-gray-500" />
              <div>
                <h3 className="text-sm font-semibold">Settings</h3>
                <p className="text-xs text-gray-500">Account preferences</p>
              </div>
            </div>
            <button className="text-gray-500 text-sm">Open</button>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">My Addresses</h2>
            <button
              onClick={handleAddAddress}
              className="flex items-center gap-2 text-blue-500 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gray-50 p-4 rounded-lg flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{address.type}</h3>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {address.address}
                  </p>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-blue-500 text-sm mt-2"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Address Modal */}
        {showAddAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Add New Address</h2>
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    value={newAddress.type}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={3}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={() =>
                      setNewAddress({
                        ...newAddress,
                        isDefault: !newAddress.isDefault,
                      })
                    }
                  />
                  <label className="text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit">Save Address</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
