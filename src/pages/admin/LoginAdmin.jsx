import { useState } from "react";
import { adminAuthStore } from "../../store/adminAuthStore";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ElderIllus from "../../assets/elder05.png";
import { toast } from "react-toastify";

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogin } = adminAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Submitting form data:", formData);
      const loginSuccess = await login(formData);
      if (loginSuccess) {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center w-full p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center py-6 md:py-10">
          <h1 className="text-2xl md:text-3xl text-cyan-600 font-bold">
            Admin Sign In
          </h1>
          <img
            src={ElderIllus}
            alt="Healthcare Illustration"
            className="w-3/4 max-w-[300px] md:max-w-[400px] mt-6 md:mt-10"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-cyan-50 px-6 md:px-10 py-8 md:py-12 rounded-t-[40px] md:rounded-t-[60px] flex flex-col gap-6 items-center"
        >
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
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
              "Admin Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
