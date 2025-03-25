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
    <div className="bg-cyan-600 w-full p-7 ">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="font-semibold text-cyan-700 mb-10 mt-10 text-2xl flex gap-5 ">
          Add New Patient
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-slate-400"
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
              className="mt-1 w-full text-lg text-cyan-600 input"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-slate-400"
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
              className="mt-1 w-full text-lg text-cyan-600 input"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-lg font-medium text-slate-400"
            >
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              required
              className="mt-1 w-full text-lg text-cyan-600 input"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-medium text-slate-400"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={patientData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full text-lg text-cyan-600 input"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-lg font-medium text-slate-400"
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              className="mt-1 w-full text-lg text-cyan-600 input"
            />
          </div>

          <div>
            <label
              htmlFor="healthCondition"
              className="block text-lg font-medium text-slate-400"
            >
              Health Condition:
            </label>
            <textarea
              id="healthCondition"
              name="healthCondition"
              value={patientData.healthCondition}
              onChange={handleChange}
              className="mt-1 w-full text-lg text-cyan-600 h-50 input"
            />
          </div>
          <div className="flex justify-center mb-10">
            <button
              type="submit"
              className="bg-cyan-700 w-50 text-lg text-slate-300 p-2 rounded-md mt-10 shadow-2xl"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddPatients;
