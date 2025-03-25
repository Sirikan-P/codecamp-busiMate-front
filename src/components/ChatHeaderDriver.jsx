import { driverChatStore } from "../store/driverChatStore";
import { X } from "lucide-react";

const ChatHeaderDriver = () => {
  const { selectedUser, setSelectedUser, onlineUsers } = driverChatStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="h-10 w-10 rounded-full relative">
              <img
                src={selectedUser?.profileImage || "/avatar.png"}
                alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </h3>
            <p className="text-sm text-gray-300">
              {selectedUser && onlineUsers.includes(selectedUser.id.toString())
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeaderDriver;