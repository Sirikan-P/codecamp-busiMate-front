import React, { useEffect, useRef, useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios";

function settingPageUser() {
  const fileInputRef = useRef(null);
  const checkAuth = userAuthStore((state) => state.checkAuth);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const authUser = userAuthStore((state) => state.authUser);
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );
  const userAddress = userAuthStore((state) => state.userAddress);
  console.log("userAddress", userAddress);
  const UpdateImageProfileAuthUser = userAuthStore(
    (state) => state.UpdateImageProfileAuthUser
  );

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("user/me");
      setUserForm(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    setUserForm({
      ...userForm,
      firstName: authUser.result.firstName,
      lastName: authUser.result.lastName,
      phoneNumber: authUser.result.phoneNumber,
      email: authUser.result.email,
      address: userAddress[0].address,
    });
    fetchData();
    fetchGetUserAddress();
  }, []);

  const hdlOnchange = (e) => {
    const obj = {
      ...userForm,
      [e.target.name]: e.target.value,
    };
    setUserForm(obj);
  };

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // เปิด dialog เลือกไฟล์
    }
  };

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      if (file) {
        // ทำอะไรกับไฟล์ เช่น อัปโหลด
        console.log("Selected file:", file);
        formData.append("profileImageUrl", file);
        await UpdateImageProfileAuthUser(formData);
        console.log("ressssssssssssssssssssssssssss");
        checkAuth();
        console.log("hhhhhhhhhhhhhhhhhhhhhhh");
        //อัพเดทรูปภาพ Profile
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlSubmit = async (e) => {
    try {
      const res = await axiosInstance.patch("user/me/edit", userForm);
      checkAuth();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("authUser", authUser);
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
                <div>
                  <input
                    hidden
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*" // อนุญาตเฉพาะไฟล์รูปภาพ
                  />
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden mr-4 cursor-pointer" // เพิ่ม cursor-pointer
                    onClick={handleProfileClick}
                  >
                    {authUser?.result?.profileImage ? (
                      <img
                        src={authUser?.result?.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="path/to/profile-image.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
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
                  value={userForm.firstName}
                  onChange={hdlOnchange}
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
                  value={userForm.lastName}
                  onChange={hdlOnchange}
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
                value={userForm.phoneNumber}
                onChange={hdlOnchange}
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
                value={userForm.email}
                onChange={hdlOnchange}
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
              value={userForm.address}
              onChange={hdlOnchange}
            />
          </div>

          <button className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            + Add another address
          </button>
        </div>
      </div>
      <button
        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={hdlSubmit}
      >
        Update
      </button>
    </div>
  );
}
export default settingPageUser;
