import { useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import AuthImagePattern from "../../components/AuthImagePattern";
import { Loader2, Lock, Mail, MessageSquare, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import elder05 from "../../assets/elder05.png";
import busimatelogo from "../../assets/busimatelogo.png";
import { toast } from "react-toastify";

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogin } = userAuthStore();
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
      navigate("/user/profile");
    }
  };

  const actionLinktoRegister = () => navigate("/user/register");
  const actionLinktoDriverRegister = () => navigate("/driver/register");

  return (
    <div className="bg-cyan-600 h-screen flex flex-col items-center justify-center w-full">
      {/* TITLE */}
      <div className="absolute top-30 z-20 text-center flex flex-col gap-5 place-items-center">
        <div className="text-4xl font-bold top-40 text-cyan-700 ">
          Busi <span className="italic text-5xl ">Mate</span>
        </div>
        <img className="w-80" src={elder05} alt="" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-6 h-[500px] top-90 absolute z-10 rounded-lg p-5  shadow-2xl flex flex-col justify-center place-items-center"
      >
        {/* Sign in */}
        <div className="w-full flex justify-center">
          <div className="text-[24px] text-cyan-600 pt-5 pb-5 font-semibold">
            Login Account
          </div>
        </div>
        <div className="form-control">
          {/* email input */}
          <label className="block text-sm font-medium text-cyan-800  mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"></div>
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
        </div>
        {/* password Input */}
        <div className="form-control">
          <label className="block text-sm font-medium text-cyan-800  mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered pl-10 h-12 w-[300px]"
              placeholder="•••••••••"
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
        {/* btn login */}
        <button
          type="submit"
          className="w-1/2 bg-cyan-600 text-white py-3 rounded-md text-xl"
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
        {/* USER Register */}
        <div className="w-full flex justify-center">
          <div className="text-center text-sm text-slate-500">
            Don't have an account?
            <span
              onClick={actionLinktoRegister}
              className="text-cyan-800 hover:text-cyan-600 font-medium pl-2"
            >
              Register
            </span>
          </div>
        </div>

        {/* Driver Register */}
        <div className="text-center text-sm text-gray-500">
          <div
            onClick={actionLinktoDriverRegister}
            className="text-rose-800 font-medium"
          >
            Become our Driver
          </div>
        </div>
      </form>
      <div className="bg-slate-50 absolute z-5 bottom-135 w-full h-full rounded-b-4xl"></div>
    </div>
  );
};

export default LoginUser;
