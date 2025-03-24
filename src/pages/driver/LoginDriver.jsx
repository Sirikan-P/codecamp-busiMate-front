import { useState } from "react";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { driverAuthStore } from "../../store/driverAuthStore";
import busimatelogo from "../../assets/busimatelogo.png"; // Make sure this path is correct
import { toast } from "react-toastify";

const LoginDriver = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogin } = driverAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      try {
        await login(formData);
        navigate("/driver");
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  const actionLinktoDriverRegister = () => navigate("/driver/register");

  return (
    <div className="bg-cyan-600 h-screen flex flex-col items-center justify-center w-full relative">
      {/* TITLE */}
      <div className="absolute top-10 z-20 text-center flex flex-col gap-5 items-center">
        <div className="text-4xl font-bold text-white">
          Busi <span className="italic text-5xl">Mate</span>
        </div>
        <img className="w-32" src={busimatelogo} alt="Busimate Logo" /> {/* Fixed Elder04 to busimatelogo */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-6 w-full max-w-md rounded-lg p-5 shadow-2xl flex flex-col justify-center items-center relative z-10 mt-20"
      >
        {/* Sign in */}
        <div className="w-full flex justify-center">
          <div className="text-[24px] text-cyan-600 pt-5 pb-5 font-semibold">
            Driver Login
          </div>
        </div>

        <div className="w-full space-y-5 px-4">
          {/* email input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-full hover:bg-cyan-600 transition duration-200 font-medium flex items-center justify-center"
            disabled={isLogin}
          >
            {isLogin ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={actionLinktoDriverRegister}
              className="text-cyan-500 hover:text-cyan-600 font-medium cursor-pointer"
            >
              Become our Driver
            </span>
          </div>
        </div>
      </form>

      {/* Background shape */}
      <div className="bg-slate-50 absolute z-0 bottom-0 w-full h-1/2 rounded-t-3xl"></div>
    </div>
  );
};

export default LoginDriver;