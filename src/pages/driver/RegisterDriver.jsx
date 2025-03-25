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
    <div className="bg-cyan-600 p-5 pt-10 pb-10 w-full">

    <div className="w-full rounded-lg flex justify-center flex-col bg-white p-10">
      {/* register head */}
      <h1 className="text-2xl font-bold text-cyan-600 mb-30">Register</h1>
   

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* firstname & lastname input */}
        <div className="flex gap-5">
          {/* firstname input */}
          <div>
            <label
              htmlFor="firstname"
              s
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10 h-12`}
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
          </div>
          {/* Lastname input */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10 h-12`}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        {/* Phone number input */}
        <div className="form-control">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Phone className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              className={`input input-bordered w-full pl-10 h-12`}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>
        {/* Email input */}
        <div className="form-control">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="email"
              className={`input input-bordered w-full pl-10 h-12`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        {/* Password input */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10 h-12`}
              placeholder="please enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>
        {/* Confirm Password input */}
        <div className="relative">
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10 h-12`}
              placeholder="please enter your password again"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>
        {/* age & gender */}
        <div className="flex gap-5">
          {/* age input */}
          <div>
            <label
              htmlFor="firstname"
              s
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10 h-12`}
                placeholder="age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>
          </div>
          {/* gender input */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <Select
              options={options}
              className="w-full"
              value={options.find((option) => option.value === formData.gender)}
              onChange={(selectedOption) =>
                setFormData({ ...formData, gender: selectedOption.value })
              }
            />
          </div>
        </div>
        {/* Create Account button */}
        <div className="flex justify-center items-center mt-5">                                           
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
        </div>
      </form>
      {/* Sign in bt */}
      <div className="text-center pt-5">
      <p className="text-slate-400">
      Already have an account?{" "}
          <Link to="/driver/login" className="font-semibold link text-pink-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default RegisterDriver;
