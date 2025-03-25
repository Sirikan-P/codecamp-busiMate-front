import React, { useEffect, useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

function SettingPagePatiens() {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    healthCondition: "",
  });
  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    healthCondition: "",
  });
  const { id } = useParams();
  console.log("id", id);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/user/patient/${id}`);
      setPatientData(res.data);
      setPatientForm(res.data);
    } catch (error) {}
  };

  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );
  const userAddress = userAuthStore((state) => state.userAddress);
  console.log("userAddress", userAddress);

  useEffect(() => {
    fetchData();
    fetchGetUserAddress();
  }, []);

  const hdlOnchange = (e) => {
    
      
      const obj = {
        ...patientForm,
        [e.target.name]: e.target.value
      };
      setPatientForm(obj);

  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(
        `/user/patient/edit/${id}`,
        patientForm
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("patientForm", patientForm);
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
            <div key={address.id} className="max-w-md mx-auto p-4">
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
                    {patientData.firstName + "  " + patientData.lastName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {patientData.phoneNumber}
                  </div>
                  <div className="text-sm text-gray-600">{patientData.age}</div>
                  <div className="text-sm text-gray-600">
                    {patientData.healthCondition}
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
                  value={patientForm.firstName}
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
                  value={patientForm.lastName}
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
                value={patientForm.phoneNumber}
                onChange={hdlOnchange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="age"
                id="age"
                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                value={patientForm.age}
                onChange={hdlOnchange}
              />
            </div>
          </div>

          <div className="font-semibold mb-4">Health Condition</div>

          <div className="mb-4">
            <label
              htmlFor="healthCondition"
              className="block text-sm font-medium text-gray-700"
            >
              your health condition
            </label>
            <input
              type="text"
              name="healthCondition"
              id="healthCondition"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              value={patientForm.healthCondition}
              onChange={hdlOnchange}
            />
          </div>

         
        </div>
        <button
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={hdlSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default SettingPagePatiens;
