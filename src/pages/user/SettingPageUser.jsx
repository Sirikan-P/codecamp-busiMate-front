import React, { useEffect, useRef, useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";

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
      firstName: authUser?.result?.firstName,
      lastName: authUser?.result?.lastName,
      phoneNumber: authUser?.result?.phoneNumber,
      email: authUser?.result?.email,
      address: userAddress[0]?.address,
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

  const hdlDelete = async (addressId) => {
    try {
      const res = await axiosInstance.delete(`/user/address/${addressId}`);
      fetchGetUserAddress();
    } catch (error) {
     
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const hdlClick = () => {
    navigate("/user/address");
  };

  // btn cancle

  console.log("authUser", authUser);
  return (
    <div className="flex flex-col items-center justify-center bg-cyan-600 p-5">
      <div className="bg-white w-full p-5 pt-10 rounded-lg shadow-lg ">
        {/* title */}
        <div className="font-semibold text-cyan-700 mb-5 text-2xl flex gap-5 ">
          Edit Profile
          </div>
        
       

        {/* Update profile */}
        <div>
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
                      src={authUser?.profileImage}
                      alt="Profile"
                      className="w-full h-full  bg-cyan-600"
                    />
                  )}
                </div>
              </div>
              {/* User Information */}
              <div>
                <div className="font-semibold text-cyan-600 text-2xl">
                  {authUser?.firstName + "  " + authUser?.lastName}
                </div>
                <div className="text-sm text-cyan-600">
                  {authUser?.phoneNumber}
                </div>
                <div className="text-sm text-slate-400">
                  {userAddress[0]?.address}
                </div>
              </div>
            </div>
          </div>
          {/* Update profile */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-8 gap-5 text-xl text-cyan-600 font-semibold">
              Update Profile
              <Pencil size={16} className="text-cyan-600" />
            </div>

            <div className="flex gap-2 mb-5">
              {/* firt name */}
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-md font-medium text-slate-400"
                >
                  First Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 w-35 text-lg text-cyan-600"
                    value={userForm.firstName}
                    onChange={hdlOnchange}
                  />
                </div>
              </div>
{/* lastName */}
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-md font-medium text-slate-400"
                >
                  Last Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 w-35 text-lg text-cyan-600"
                    value={userForm.lastName}
                    onChange={hdlOnchange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-md font-medium text-slate-400"
                >
                Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mt-1 text-lg text-cyan-600"
                  value={userForm.phoneNumber}
                  onChange={hdlOnchange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-md font-medium text-slate-400"
                >
                Email
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mt-1 text-md text-cyan-600"
                  value={userForm.email}
                  onChange={hdlOnchange}
                />
              </div>
            </div>

            <div className="block text-xl font-medium text-cyan-600"
            >Address</div>
            {userAddress.map((address) => {
              return (
                <div className="mb-4 mt-2 gap-2 flex flex-col border border-cyan-200 rounded-lg p-5 shadow-md">
                  <label className="block text-md font-medium text-slate-400">
                    Your address
                  </label>
                  <input
                    type="text"
                    name="Address"
                    id="Address"
                    className="mt-1 text-md text-cyan-600"
                    value={address.address}
                    onChange={hdlOnchange}
                  />
                  <button
                    onClick={() => hdlDelete(address.id)}
                    className="flex-1  bg-slate-50 text-rose-800 border border-slate-200 w-20 mt-2 mb-5 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              );
            })}

            <button
              className="bg-cyan-600 w-full text-lg text-slate-300 p-2 rounded-md mb-5 shadow-2xl"
              onClick={hdlClick}
            >
              + Add another address
            </button>
        <div className="flex gap-3 mt-8">
          <button
            onClick={hdlSubmit}
            className="flex-1 px-4 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Save Change
          </button>
          <button
            onClick={()=> navigate("/user/profile")}
            className="flex-1 px-4 py-2.5 bg-slate-100 text-cyan-600 rounded-lg transition-colors">
              Cancel
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default settingPageUser;