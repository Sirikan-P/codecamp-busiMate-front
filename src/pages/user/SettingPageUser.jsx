import React, { useEffect } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { use } from "react";

function settingPageUser() {
  const authUser = userAuthStore((state) => state.authUser);
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );
  const userAddress = userAuthStore((state) => state.userAddress);
  console.log("userAddress", userAddress);

  useEffect(() => {
    fetchGetUserAddress();
  }, []);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="text-2xl">🏠</div>
          <div className="text-2xl">💬</div>
        </div>
        <div className="font-semibold text-lg">MAKE APPOINTMENT</div>
        <div></div> {/* Placeholder for alignment */}
      </div>
      <div>
        {userAddress.map((address) => {
          return (
            <div className="max-w-md mx-auto p-4">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src="path/to/profile-image.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {authUser?.result?.firstName +
                      "  " +
                      authUser?.result?.lastName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {authUser?.result?.phoneNumber}
                  </div>
                  <div className="text-sm text-gray-600">{address.address}</div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="font-semibold mb-4">Update Profile</div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={authUser?.result?.firstName}
                />
              </div>
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={authUser?.result?.lastName}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                value={authUser?.result?.phoneNumber}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                value={authUser?.result?.email}
              />
            </div>
          </div>

          <div className="font-semibold mb-4">Address</div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Your address
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              value={userAddress[0]?.address}
            />
          </div>

          <button className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            + Add another address
          </button>
        </div>
      </div>
      <button className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Update
      </button>
    </div>
  );
}
export default settingPageUser;
