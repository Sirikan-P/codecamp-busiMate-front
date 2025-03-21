import { Camera, Mail, User } from "lucide-react";
import { userAuthStore } from "../../store/userAuthStore";
import { useState } from "react";

const ProfilePageUser = () => {
  const { authUser, isUpdatingProfile, updateProfile } = userAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));

    try {
      await updateProfile(file);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image in ProfilePageUser:", error);
      setSelectedImage(null);
    }
  };

  return (
    <div className="h-screen py-20 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-gray-400">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative inline-block">
              <img
                src={selectedImage || authUser?.profileImage || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-gray-600 hover:bg-gray-500 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                value={`${authUser?.firstName || ""} ${authUser?.lastName || ""}`}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <input
                type="email"
                value={authUser?.email || ""}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 bg-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4 text-white">Account Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-600">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageUser;