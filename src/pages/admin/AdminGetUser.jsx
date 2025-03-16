import { Bike, ChartNoAxesCombined, House, User } from "lucide-react";
import React from "react";

function AdminGetUser() {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg ">
        {/* navigator */}
        <nav className="w-full border-2  h-12 bg-gray-200 flex justify-around items-center">
          <a href="#">
            <span>
              <House />
            </span>
          </a>
          <a href="#">
            <span>
              <User />
            </span>
          </a>
          <a href="#">
            <span>
              <Bike />
            </span>
          </a>
          <a href="#">
            <span>
              <ChartNoAxesCombined />
            </span>
          </a>
        </nav>
        {/* ---- */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 border-2 ">
          <p className="font-semibold mb-4 text-center">User Account</p>
          <p className=" mb-4 text-center">Added style later</p>
          <div className="flex items-center justify-between mb-4 border-2">
            <div className="flex items-center space-x-2 ">
              <img
                src="https://storage.googleapis.com/a1aa/image/rmfRvi7LbBdtV0GTBl3pde5WbHqn9y14MSyc-fEnoB0.jpg"
                alt="Profile picture of Willium Deno"
                className="rounded-full"
                width="50"
                height="50"
              />
              <div className="border-2">
                <p className="font-semibold">Willium Deno</p>
                <p className="text-gray-500">+66 666 66666</p>
              </div>
            </div>
            <div className="flex flex-col border-2">
              <label htmlFor="#">Status</label>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 border-2">
            <div className="flex items-center space-x-2 ">
              <img
                src="https://storage.googleapis.com/a1aa/image/rmfRvi7LbBdtV0GTBl3pde5WbHqn9y14MSyc-fEnoB0.jpg"
                alt="Profile picture of Willium Deno"
                className="rounded-full"
                width="50"
                height="50"
              />
              <div className="border-2 ">
                <p className="font-semibold">Willium Deno</p>
                <p className="text-gray-500">+66 666 66666</p>
              </div>
            </div>
            <div className="flex flex-col border-2">
              <label htmlFor="#">Status</label>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 border-2">
            <div className="flex items-center space-x-2 ">
              <img
                src="https://storage.googleapis.com/a1aa/image/rmfRvi7LbBdtV0GTBl3pde5WbHqn9y14MSyc-fEnoB0.jpg"
                alt="Profile picture of Willium Deno"
                className="rounded-full"
                width="50"
                height="50"
              />
              <div className="border-2">
                <p className="-semibold">Willium Deno</p>
                <p className="text-gray-500">+66 666 66666</p>
              </div>
            </div>
            <div className="flex flex-col border-2">
              <label htmlFor="#">Status</label>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 border-2">
            <div className="flex items-center space-x-2 ">
              <img
                src="https://storage.googleapis.com/a1aa/image/rmfRvi7LbBdtV0GTBl3pde5WbHqn9y14MSyc-fEnoB0.jpg"
                alt="Profile picture of Willium Deno"
                className="rounded-full"
                width="50"
                height="50"
              />
              <div className="border-2">
                <p className="font-semibold">Willium Deno</p>
                <p className="text-gray-500">+66 666 66666</p>
              </div>
            </div>
            <div className="flex flex-col border-2">
              <label htmlFor="#">Status</label>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 border-2">
            <div className="flex items-center space-x-2 ">
              <img
                src="https://storage.googleapis.com/a1aa/image/rmfRvi7LbBdtV0GTBl3pde5WbHqn9y14MSyc-fEnoB0.jpg"
                alt="Profile picture of Willium Deno"
                className="rounded-full"
                width="50"
                height="50"
              />
              <div className="border-2">
                <p className="font-semibold">Willium Deno</p>
                <p className="text-gray-500">+66 666 66666</p>
              </div>
            </div>
            <div className="flex flex-col border-2">
              <label htmlFor="#">Status</label>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* MORE to add */}
      </div>
    </div>
  );
}

export default AdminGetUser;
