import React, { useState } from "react";
import { Camera, Star, Edit2, CheckCircle } from "lucide-react";

const DriverProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 890",
    carModel: "Toyota Camry",
    licensePlate: "ABC 123",
    rating: 4.8,
    totalTrips: 156,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-6 rounded-b-[2rem]">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-blue-700 rounded-full"
          >
            {isEditing ? <CheckCircle onClick={handleSave} /> : <Edit2 />}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-blue-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span>{profile.rating}</span>
              <span className="mx-1">•</span>
              <span>{profile.totalTrips} trips</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="space-y-3">
            {Object.entries({
              "Full Name": "name",
              Email: "email",
              Phone: "phone",
            }).map(([label, key]) => (
              <div key={key} className="space-y-1">
                <label className="text-sm text-gray-500">{label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{profile[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vehicle Information</h3>
          <div className="space-y-3">
            {Object.entries({
              "Car Model": "carModel",
              "License Plate": "licensePlate",
            }).map(([label, key]) => (
              <div key={key} className="space-y-1">
                <label className="text-sm text-gray-500">{label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="font-medium">{profile[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverProfile;
