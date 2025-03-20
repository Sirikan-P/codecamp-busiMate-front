import React from "react";
import { Search, Phone, Camera as VideoCamera } from "lucide-react";

const DriverChat = () => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/20"
          />
        </div>
      </div>

      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((chat) => (
          <div key={chat} className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <img
                src={`https://images.unsplash.com/photo-${
                  1500000000000 + chat
                }?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                alt="Patient"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Patient Name {chat}</h3>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Thank you for the safe ride! Really appreciate your help
                  today.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Chat Preview */}
      <div className="fixed bottom-20 right-4 bg-white rounded-2xl shadow-lg border p-4 w-[calc(100%-2rem)] max-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Active chat"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <VideoCamera className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverChat;