import { useState } from "react";
import {
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthImagePattern from "../../components/AuthImagePattern";
import { toast } from "react-toastify";
import { driverAuthStore } from "../../store/driverAuthStore";
import Elder02 from "../../assets/elder02.jpg";
import Select from "react-select";

const RegisterDriver = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");

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
    <div className="w-full rounded-lg flex justify-center flex-col bg-whites p-10">
      {/* register head */}
      <h1 className="text-2xl font-bold text-cyan-600 mb-30">Register</h1>
      {/* <div className="flex justify-center">
        <img src={Elder02} alt="" className="w-[250px]" />
      </div> */}

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
        <div className="flex justify-center items-center">
          <button
            disabled={isRegister}
            type="submit"
            className="w-1/2 bg-cyan-500 text-white py-2 px-4 rounded-4xl h-12 hover:bg-cyan-600 transition-colors"
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
        </div>
      </form>
      {/* Sign in bt */}
      <div className="text-center pt-5">
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to="/user/login" className=" link text-cyan-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    // <div className="min-h-screen grid lg:grid-cols-2">
    //   {/* left side */}
    //   <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    //     <div className="w-full max-w-md space-y-8">
    //       {/* LOGO */}
    //       <div className="text-center mb-8">
    //         <div className="flex flex-col items-center gap-2 group">
    //           <div className="size-12 rounded-xl bg-base-200 flex items-center justify-center group-hover:bg-base-300 transition-colors">
    //             <MessageSquare className="w-6 h-6 text-blue-600" />
    //           </div>
    //           <h1 className="text-2xl font-bold mt-2">Create Account</h1>
    //           <p className="text-base">Get started with your free account</p>
    //         </div>
    //       </div>

    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">First Name</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <User className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="text"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="First Name"
    //               value={formData.firstName}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, firstName: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Last Name</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <User className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="text"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="Last Name"
    //               value={formData.lastName}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, lastName: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Phone Number</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <Phone className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="text"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="Phone Number"
    //               value={formData.phoneNumber}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, phoneNumber: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Email</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <Mail className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="email"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="you@example.com"
    //               value={formData.email}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, email: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Password</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <Lock className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="password"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="•••••••••"
    //               value={formData.password}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, password: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Age</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <Lock className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type="text"
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="age"
    //               value={formData.age}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, age: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text font-medium">Gender</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
    //               <Lock className="w-5 h-5 text-gray-500" />
    //             </div>
    //             <input
    //               type=""
    //               className={`input input-bordered w-full pl-10 h-12`}
    //               placeholder="gender"
    //               value={formData.gender}
    //               onChange={(e) =>
    //                 setFormData({ ...formData, gender: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>

    //         <button
    //           type="submit"
    //           className="btn btn-primary w-full"
    //           disabled={isRegister}
    //         >
    //           {isRegister ? (
    //             <>
    //               <Loader2 className="w-5 h-5 animate-spin" />
    //               Loading....
    //             </>
    //           ) : (
    //             "Create Account"
    //           )}
    //         </button>
    //       </form>

    //       <div className="text-center">
    //         <p className="text-gray-500">
    //           Already have an account?{" "}
    //           <Link to="/driver/login" className="link link-primary">
    //             Sign in
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* right side */}
    //   <AuthImagePattern
    //     title="Join our community"
    //     subtitle="Connect with friends, share moments, and stay in touch with you loved onces"
    //   />
    // </div>
  );
};
export default RegisterDriver;
