import { useEffect } from "react";
import { driverChatStore } from "../../store/driverChatStore";
import SidebarChatDriver from "../../components/SidebarChatDriver";
import NoChatSelected from "../../components/NoChatSelected";
import ChatContainer from "../../components/ChatContainerDriver";

const ChatDriver = () => {
  const { selectedUser, connectSocket, joinRoom, setSelectedUser, disconnectSocket } =
    driverChatStore();

  useEffect(() => {
    connectSocket();
    setSelectedUser(null);

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, setSelectedUser, disconnectSocket]);

  useEffect(() => {
    if (selectedUser?.id) {
      joinRoom(selectedUser.id);
    }
  }, [joinRoom, selectedUser?.id]);

  return (
    <div className="h-screen bg-cyan-600">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SidebarChatDriver />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDriver;