import { useState } from "react";
import AuthImagePattern from "../../components/AuthImagePattern";
import { Loader2, Lock, Mail, MessageSquare, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { driverAuthStore } from "../../store/driverAuthStore";
import Elder04 from "../../assets/elder04.jpg";
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

  // function for driver logi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await login(formData);
      navigate("/driver");
    }
  };

  // function for driver register
  const actionLinktoDriverRegister = () => {
    navigate("/driver/register");
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center pt-5 ">
        <div className="w-full ">
          {/* Logo */}
                <div className="flex flex-col justify-center ">
                  <div className="flex justify-center">
                    <img
                      src={busimatelogo}
                      alt="Healthcare Illustration"
                      className="w-[250px]"
                    />
                  </div>
                </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-cyan-50  h-full rounded-t-[60px] flex flex-col gap-5 justify-center place-items-center pb-30"
          >
            {/* Sign in */}
            <div className="w-full flex justify-items-start pl-15 ">
             <div className="text-[24px]  text-cyan-600 pt-20 pb-5">Sign In</div>
            </div>
            <div className="gap-5 flex flex-col justify-center place-items-center">
            {/* email input */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
              <input
                type="email"
                className="bg-white w-[300px] px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
         
          </div>

           {/* password Input */}
           <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered pl-10 h-12 w-[300px]"
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
          {/* Log in Button */}
            <button
              type="submit"
              className="w-50 bg-cyan-500 mt-6  text-white py-3 rounded-4xl transition duration-200 font-medium"
              disabled={isLogin}
            >
              {isLogin ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading....
                </>
              ) : (
                "Login"
              )}
            </button>
            </div>
          {/* Driver Register */}
          <div className="text-center text-sm text-gray-500">
            Don't have an account?
            <div
              onClick={actionLinktoDriverRegister}
              className="text-cyan-500 hover:text-cyan-600 font-medium"
            >
              Become our Driver
            </div>
          </div>
          </form>

        </div>
      </div>


    </div>
  );
};
export default LoginDriver;
