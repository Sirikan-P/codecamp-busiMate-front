import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-32">Register</h1>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstname"
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
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Province
              </label>
              <select
                id="province"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Province</option>
                <option value="Krabi">Krabi</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Kanchanaburi">Kanchanaburi</option>
                <option value="Kalasin">Kalasin</option>
                <option value="Kamphaeng Phet">Kamphaeng Phet</option>
                <option value="Khon Kaen">Khon Kaen</option>
                <option value="Chanthaburi">Chanthaburi</option>
                <option value="Chachoengsao">Chachoengsao</option>
                <option value="Chonburi">Chonburi</option>
                <option value="Chainat">Chainat</option>
                <option value="Chaiyaphum">Chaiyaphum</option>
                <option value="Chumphon">Chumphon</option>
                <option value="Chiang Rai">Chiang Rai</option>
                <option value="Chiang Mai">Chiang Mai</option>
                <option value="Trang">Trang</option>
                <option value="Trat">Trat</option>
                <option value="Tak">Tak</option>
                <option value="Nakhon Nayok">Nakhon Nayok</option>
                <option value="Nakhon Pathom">Nakhon Pathom</option>
                <option value="Nakhon Phanom">Nakhon Phanom</option>
                <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
                <option value="Nakhon Sawan">Nakhon Sawan</option>
                <option value="Nakhon Si Thammarat">Nakhon Si Thammarat</option>
                <option value="Nan">Nan</option>
                <option value="Narathiwat">Narathiwat</option>
                <option value="Nong Bua Lamphu">Nong Bua Lamphu</option>
                <option value="Nong Khai">Nong Khai</option>
                <option value="Nonthaburi">Nonthaburi</option>
                <option value="Buriram">Buriram</option>
                <option value="Pathum Thani">Pathum Thani</option>
                <option value="Prachuap Khiri Khan">Prachuap Khiri Khan</option>
                <option value="Prachinburi">Prachinburi</option>
                <option value="Pattani">Pattani</option>
                <option value="Phra Nakhon Si Ayutthaya">
                  Phra Nakhon Si Ayutthaya
                </option>
                <option value="Phayao">Phayao</option>
                <option value="Phang Nga">Phang Nga</option>
                <option value="Phatthalung">Phatthalung</option>
                <option value="Phichit">Phichit</option>
                <option value="Phitsanulok">Phitsanulok</option>
                <option value="Phetchaburi">Phetchaburi</option>
                <option value="Phetchabun">Phetchabun</option>
                <option value="Phrae">Phrae</option>
                <option value="Phuket">Phuket</option>
                <option value="Maha Sarakham">Maha Sarakham</option>
                <option value="Mukdahan">Mukdahan</option>
                <option value="Mae Hong Son">Mae Hong Son</option>
                <option value="Yasothon">Yasothon</option>
                <option value="Yala">Yala</option>
                <option value="Roi Et">Roi Et</option>
                <option value="Ranong">Ranong</option>
                <option value="Rayong">Rayong</option>
                <option value="Ratchaburi">Ratchaburi</option>
                <option value="Lopburi">Lopburi</option>
                <option value="Lampang">Lampang</option>
                <option value="Lamphun">Lamphun</option>
                <option value="Loei">Loei</option>
                <option value="Sisaket">Sisaket</option>
                <option value="Sakon Nakhon">Sakon Nakhon</option>
                <option value="Songkhla">Songkhla</option>
                <option value="Satun">Satun</option>
                <option value="Samut Prakan">Samut Prakan</option>
                <option value="Samut Songkhram">Samut Songkhram</option>
                <option value="Samut Sakhon">Samut Sakhon</option>
                <option value="Saraburi">Saraburi</option>
                <option value="Sing Buri">Sing Buri</option>
                <option value="Sukhothai">Sukhothai</option>
                <option value="Suphan Buri">Suphan Buri</option>
                <option value="Surat Thani">Surat Thani</option>
                <option value="Surin">Surin</option>
                <option value="Sa Kaeo">Sa Kaeo</option>
                <option value="Nakhon Pathom">Nakhon Pathom</option>
                <option value="Ubon Ratchathani">Ubon Ratchathani</option>
                <option value="Udon Thani">Udon Thani</option>
                <option value="Uttaradit">Uttaradit</option>
                <option value="Uthai Thani">Uthai Thani</option>
                <option value="Amnat Charoen">Amnat Charoen</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                placeholder="Postcode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
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
              <div className="w-20">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
              </div>
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

export default Register;
