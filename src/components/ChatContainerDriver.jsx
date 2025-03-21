import { useEffect, useRef } from "react";
import { driverChatStore } from "../store/driverChatStore";
import { driverAuthStore } from "../store/driverAuthStore";
import ChatHeaderDriver from "./ChatHeaderDriver";
import MessageInputDriver from "./MessageInputDriver";
import MessageSkeletonDriver from "../components/skeletons/MessageSkeletonUser";
import { formatMessageTime } from "../lib/utils";

const ChatContainerDriver = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    joinRoom,
    connectSocket,
  } = driverChatStore();
  const { authDriver } = driverAuthStore();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!authDriver) return;

    const setupChat = async () => {
      console.log("Setting up chat for driver. Authenticated:", authDriver.id);
      await connectSocket(); // Ensure socket is connected early
      if (selectedUser?.id) {
        console.log("Joining room and fetching messages for:", selectedUser.id);
        await joinRoom(selectedUser.id);
        await getMessages(selectedUser.id);
      }
    };
    setupChat();
  }, [authDriver, selectedUser, joinRoom, getMessages, connectSocket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (!authDriver) {
    return <div>Please log in to view chats</div>;
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeaderDriver />
        <MessageSkeletonDriver />
        <MessageInputDriver />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeaderDriver />
        <div className="flex-1 p-4 text-center">
          Select a user to start chatting
        </div>
        <MessageInputDriver />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeaderDriver />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSentByDriver = message.senderDriverId === authDriver.id && !message.senderUserId;
          const senderProfileImage = isSentByDriver
            ? authDriver.profileImageUrl || "/avatar.png"
            : selectedUser.profileImage || "/avatar.png";

          return (
            <div
              key={message.id}
              className={`chat ${isSentByDriver ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="h-10 w-10 rounded-full border">
                  <img src={senderProfileImage} alt="profile pic" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInputDriver />
    </div>
  );
};

export default ChatContainerDriver;