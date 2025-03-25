import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router";

const UserAddPatients = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    healthCondition: "",
  });
   const navigate = useNavigate();

   

  const handleChange = (e) => {
    const obj = {
      ...patientData,
      [e.target.name]: e.target.value,
    };
    setPatientData(obj);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axiosInstance.post("/user/patient/add", patientData);
      
      console.log("Patient added successfully:", res.data);
      // Reset form
      setPatientData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phoneNumber: "",
        healthCondition: "",
      });
      alert("Patient added successfully!"); // แสดง message สำเร็จ
      navigate("/user/patients"); 
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient. Please check the console for details."); // แสดง error message
    }
  };

  console.log(patientData);
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={patientData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={patientData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select> 
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={patientData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={patientData.age}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="healthCondition"
            className="block text-sm font-medium text-gray-700"
          >
            Health Condition:
          </label>
          <textarea
            id="healthCondition"
            name="healthCondition"
            value={patientData.healthCondition}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default UserAddPatients;