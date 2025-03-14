import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Elder02 from "../assets/elder02.jpg";

function RegisterDriver() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   return (
       <div className="w-full rounded-lg flex justify-center flex-col bg-whites p-10">
         <h1 className="text-2xl font-bold text-cyan-600 ">Register</h1>
         <div className="flex justify-center">
           <img src={Elder02} alt="" className="w-[200px] pb-10"  />
         </div>
 
         <div>
          <form className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label
                 htmlFor="firstname"s
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Firstname
               </label>
               <input
                 type="text"
                 id="firstname"
                 placeholder="Your name"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
             </div>
             <div>
               <label
                 htmlFor="lastname"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Lastname
               </label>
               <input
                 type="text"
                 id="lastname"
                 placeholder="Lastname"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
             </div>
           </div>
 
           <div>
             <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700 mb-1"
             >
               Email
             </label>
             <input
               type="email"
               id="email"
               placeholder="Your Email"
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
             />
           </div>
 
           <div className="relative">
             <label
               htmlFor="password"
               className="block text-sm font-medium text-gray-700 mb-1"
             >
               Password
             </label>
             <div className="relative">
               <input
                 type={showPassword ? "text" : "password"}
                 id="password"
                 placeholder="Password"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
               >
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
             </div>
           </div>
 
           <div className="relative">
             <label
               htmlFor="confirmPassword"
               className="block text-sm font-medium text-gray-700 mb-1"
             >
               Confirm Password
             </label>
             <div className="relative">
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 id="confirmPassword"
                 placeholder="Password"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
               <button
                 type="button"
                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
               >
                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
             </div>
           </div>
 
           <div>
             <label
               htmlFor="phone"
               className="block text-sm font-medium text-gray-700 mb-1"
             >
               Phone Number
             </label>
             <div className="flex gap-2">
 
               <input
                 type="tel"
                 id="phone"
                 placeholder="Phone Number"
                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
             </div>
           </div>
 
           <div className="flex justify-center items-center py-8">
             <button
       
               type="submit"
               className="w-1/2 bg-cyan-500 text-white py-2 px-4 rounded-4xl h-12 hover:bg-cyan-600 transition-colors"
             >
               Sign Up
             </button>
           </div>
         </form>
     </div>
       </div>
     
   );                       
}

export default RegisterDriver;
