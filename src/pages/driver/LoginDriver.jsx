import { useState } from "react";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { driverAuthStore } from "../../store/driverAuthStore";
import busimatelogo from "../../assets/busimatelogo.png";
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
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await login(formData);
      navigate("/driver");
    }
  };

  const actionLinktoDriverRegister = () => navigate("/driver/register");

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center w-full p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Logo Section */}
        <div className="flex flex-col items-center py-6 md:py-10">
          <img
            src={busimatelogo}
            alt="Busimate Logo"
            className="w-3/4 max-w-[200px] md:max-w-[250px]"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-cyan-50 px-6 md:px-10 py-8 md:py-12 rounded-t-[40px] md:rounded-t-[60px] flex flex-col gap-6 items-center"
        >
          <h1 className="text-2xl md:text-3xl text-cyan-600 font-bold">
            Sign In
          </h1>

          {/* Email Input */}
          <div className="w-full">
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
          <div className="w-full">
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
            className="w-full max-w-xs bg-cyan-500 text-white py-3 rounded-full hover:bg-cyan-600 transition duration-200 font-medium flex items-center justify-center"
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
        </form>
      </div>
    </div>
  );
};

export default LoginDriver;