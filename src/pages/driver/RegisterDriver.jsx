import { useState } from "react";
import { Loader2, Lock, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../../components/AuthImagePattern";
import { toast } from "react-toastify";
import { driverAuthStore } from "../../store/driverAuthStore";

const RegisterDriver = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    gender: "",
  });

  const { register, isRegister } = driverAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("Firstname is required");
    if (!formData.lastName.trim()) return toast.error("Lastname is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (formData.phoneNumber.length !== 10)
      return toast.error("Please input phone number correctly");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await register(formData);
      navigate("/driver/login");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-base-200 flex items-center justify-center group-hover:bg-base-300 transition-colors">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Last Name</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  className={`input input-bordered w-full pl-10 h-12`}
                  placeholder="•••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Age</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="w-5 h-5 text-gray-500" />
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Gender</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type=""
                  className={`input input-bordered w-full pl-10 h-12`}
                  placeholder="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isRegister}
            >
              {isRegister ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading....
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/user/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with you loved onces"
      />
    </div>
  );
};
export default RegisterDriver;
