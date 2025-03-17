import { faClock, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";

function EditProfileUser() {
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    navigate("/profile-user");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        {/* wwating for the final design */}
        {/*  */}
        {/* Profile Form */}
        <form className="space-y-4">
          <div className="flex items-center justify-between rounded-md gap-4">
            <div>
              <label className="text-sm text-gray-500">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                defaultValue="Tom"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Last Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                defaultValue="Cook"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              defaultValue="tom.cook@example.com"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              defaultValue="123 Main Street, Los Angeles, CA 90001, USA"
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              defaultValue="456 Elm Avenue, New York, NY 10001, USA"
            />
          </div>

          <button type="button" className="text-blue-600 text-sm">
            + Add another address
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileUser;
