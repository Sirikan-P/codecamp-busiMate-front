import React, { useState } from "react";
import { Pencil } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium text-rose-800 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
    />
  </div>
);

const SelectField = ({ label, options, value, name, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-rose-800 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

function EditProfileModal({ isOpen, onClose, onSave, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(profile);
    onClose();
  };
  console.log(profile);
  console.log(initialProfile);
  console.log(setProfile);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-3xl w-[400px] max-w-full mx-4 border-cyan-700 border-2">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profile.avatar || "https://i.pravatar.cc/200"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
              <Pencil size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Firstname and Lastname */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Firstname"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="Robert"
            />
            <InputField
              label="Lastname"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Calvin"
            />
          </div>

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="••••••••••"
          />

          {/* Address */}
          <InputField
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="123 Phaya thai Rd."
          />

          {/* Province and Postcode */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Province"
              name="province"
              value={profile.province}
              onChange={handleChange}
              options={[
                { value: "Bangkok", label: "Bangkok" },
                { value: "Chiang Mai", label: "Chiang Mai" },
                { value: "Phuket", label: "Phuket" },
              ]}
            />
            <InputField
              label="Postcode"
              name="postcode"
              value={profile.postcode}
              onChange={handleChange}
              placeholder="10400"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-rose-800 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <select
                name="phoneCountry"
                value={profile.phoneCountry}
                onChange={handleChange}
                className="w-20 p-2.5 border border-gray-200 rounded-lg mr-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="66">🇹🇭 +66</option>
                <option value="1">🇺🇸 +1</option>
                <option value="44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                placeholder="85-777-4567"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-rose-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
