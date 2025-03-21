import { useState } from "react";
import { Loader2, Lock, Mail, Phone, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { driverAuthStore } from "../../store/driverAuthStore";
import Select from "react-select";

const RegisterDriver = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    age: "",
    gender: "",
  });

  const options = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];

  const { register, isRegister } = driverAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.firstName.trim())
      return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (formData.phoneNumber.length !== 10)
      return toast.error("Phone number must be 10 digits");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");
    if (!formData.age.trim()) return toast.error("Age is required");
    if (!formData.gender) return toast.error("Gender is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      const { confirmPassword, ...dataToSubmit } = formData; // Exclude confirmPassword from submission
      await register(dataToSubmit);
      navigate("/driver/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center w-full p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 md:mb-8 text-center">
          Register as Driver
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="email"
                className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                placeholder="•••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                placeholder="•••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <Select
                options={options}
                className="w-full text-sm"
                value={options.find(
                  (option) => option.value === formData.gender
                )}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, gender: selectedOption.value })
                }
                placeholder="Select Gender"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full max-w-xs bg-cyan-500 text-white py-3 rounded-full hover:bg-cyan-600 transition duration-200 font-medium flex items-center justify-center mx-auto"
            disabled={isRegister}
          >
            {isRegister ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/driver/login" className="text-cyan-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterDriver;
