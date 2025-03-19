import React, { useState } from "react";
import {
  User,
  MapPin,
  Calendar,
  Phone,
  Car as IdCard,
  Car,
  Armchair as Wheelchair,
  HandHelping,
} from "lucide-react";

function MockDriverEditProfile() {
  const [formData, setFormData] = useState({
    firstname: "driver1",
    lastname: "lastname1",
    phone: "0810010001",
    age: "26",
    gender: "MALE",
    idCardNumber: "121231212",
    carRegNo: "4099",
    carType: "SEETS_4",
    hasWheelChair: "NOHAVE",
    hasAssist: "NOHAVE",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 font-sm mb-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Driver1 Lastname1</h2>
            <p className="text-gray-600">Update your profile information</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="divider"></div>
            <div แclassName="flex justify-center gap-4 font-sm">
              <h3 className="text-lg text-center font-semibold">
                Personal Information
              </h3>
            </div>

            {/* online */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <User size={18} className="mr-2" /> Online
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-success"
              />
            </div>

            {/* First Name */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <User size={18} className="mr-2" /> First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Last Name */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <User size={18} className="mr-2" /> Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <Phone size={18} className="mr-2" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Age */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <Calendar size={18} className="mr-2" /> Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <User size={18} className="mr-2" /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-60"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            {/* ID Card Number */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <IdCard size={18} className="mr-2" /> ID Card Number
              </label>
              <input
                type="text"
                name="idCardNumber"
                value={formData.idCardNumber}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Car Registration */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <Car size={18} className="mr-2" /> Car Reg No
              </label>
              <input
                type="text"
                name="carRegNo"
                value={formData.carRegNo}
                onChange={handleChange}
                className="input input-bordered w-60"
              />
            </div>

            {/* Car Type */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <Car size={18} className="mr-2" /> Car Type
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="select select-bordered w-60"
              >
                <option value="SEETS_4">4 Seats</option>
                <option value="SEETS_7">7 Seats</option>
              </select>
            </div>

            {/* Wheelchair Support */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <Wheelchair size={18} className="mr-2" /> Wheelchair
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-success"
              />
            </div>

            {/* Assistant Support */}
            <div className="flex items-center gap-4 font-sm">
              <label className="w-32 text-gray-600 flex items-center">
                <HandHelping size={18} className="mr-2" /> Assistant
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-success"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-60">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MockDriverEditProfile;
